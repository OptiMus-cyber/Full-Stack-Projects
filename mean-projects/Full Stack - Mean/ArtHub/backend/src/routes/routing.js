const express = require("express");
const routing = express.Router();
const middlewares = require('../utilities/middleware');
const upload = require("../utils/multer");

const artworkServices = require("../services/artwork");
const userServices = require("../services/user");
const orderServices = require("../services/order");
const wishlistServices = require("../services/wishlist");
const commissionServices = require("../services/commission");
const promotionServices = require("../services/promotion");

// Fetch all the Artworks
routing.get('/artwork/fetch', async (req,res,next) => {
    try {
        let artworks = await artworkServices.fetchArtworks(req.query);
        res.send(artworks);
    } catch (error) {
        next(error);
    }
});

// Get a Artwork
routing.get("/artwork/:id", async (req, res, next) => {
    try {
        let artwork = await artworkServices.getArtwork(req.params.id);
        res.status(200).json(artwork);
    } catch (error) {
        next(error);
    }
})

// Get list of all artists
routing.get("/artists", async (req, res, next) => {
    try {
        const artists = await userServices.getArtistsByRole("artist");
        res.status(200).json(artists);
    } catch (error) {
        next(error);
    }
});

// SignUp an user
routing.post("/auth/register", async (req, res, next)=>{
    try {
        let newUser = await userServices.register(req.body);
        res.status(201).json({ message: "User registered successfully. Please verify your email." });
    } catch (error) {
        next(error);
    }
})

// Verify user email address
routing.get("/auth/verify-email", async (req, res, next)=>{
    try {
        let newUser = await userServices.register(req.body);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
})

// SignIn an user
routing.post("/auth/login", async (req, res, next) => {
    try {
        let response = await userServices.login(req.body.email, req.body.password);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

// Get Profile Details
routing.get("/user/fetch-profile", middlewares.auth, async (req, res, next) => {
    try {
        let user = await userServices.getUserProfile(req.user.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
})

// Update Profile Details
routing.put("/user/update-profile", middlewares.auth, async (req, res, next) => {
    try {
        let updatedUser = await userServices.updateUserProfile(req.user.id, req.body);
        res.json({message: "Profile updated successfully", user: updatedUser});
    } catch (error) {
        next(error);
    }
})

// Upload Artwork
routing.post("/artwork/upload", middlewares.auth, upload.array("images", 5), async (req, res, next) => {
    try {
        let artwork = await artworkServices.uploadArtwork(req.body, req.files, req.user.id);
        res.status(201).json({
            message: "Artwork uploaded successfully",
            artwork
        })
    } catch (error) {
        next(error);
    }
})

// Place Order
routing.post("/place-order", middlewares.auth, async (req, res, next) => {
    try {
        let newOrder = await orderServices.placeOrder(req.user.id, req.body.artworkId, req.body.artistId, req.body.price, req.body.paymentMethod, req.body.shipping);
        res.json({message:"Order placed successfully", newOrder});
    } catch (error) {
        next(error);
    }
})

// Order Checkout
routing.post("/checkout", middlewares.auth, async (req, res, next) => {
    try {
        let newOrder = await orderServices.orderCheckout(req.user.id, req.body.artworkId)
        res.json({message:"Order placed successfully", newOrder});
    } catch (error) {
        next(error);
    }
})

// Order History
routing.get("/purchase-history", middlewares.auth, async (req, res, next) => {
    try {
        let orders = await orderServices.getBuyerOrders(req.user.id);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
})

// Confirm Payment
routing.post("/confirm-payment", middlewares.auth, async (req, res, next) => {
    try {
        let order = await orderServices.confirmPayment(req.body.orderId, req.body.transactionId);
        res.status(200).json({message:"Payment Successful", order});
    } catch (error) {
        next(error);
    }
})

// Add Wishlist
routing.post("/wishlist/add", middlewares.auth, async (req, res, next) => {
    try {
        let wishlist = await wishlistServices.addToWishlist(req.user.id, req.body.artworkId);
        res.status(200).json(wishlist);
    } catch (error) {
        next(error);
    }
})

// Get Wishlist
routing.get("/wishlist", middlewares.auth, async (req, res, next) => {
    try {
        let userWishlist = await wishlistServices.getWishlist(req.user.id);
        res.status(200).json(userWishlist);
    } catch (error) {
        next(error);
    }
})

// Remove Wishlist
routing.post("/wishlist/remove", middlewares.auth, async (req, res, next) => {
    try {
        let artworkId = await wishlistServices.removeFromWishlist(req.user.id, req.body.artworkId);
        res.status(200).json({message: "Removed from wishlist"});
    } catch (error) {
        next(error);
    }
})

// Check in Wishlist
routing.get("/wishlist/check/:artworkId", middlewares.auth, async (req, res, next) => {
    try {
        let item = await wishlistServices.checkUserArtworkWishlist(req.user.id, req.params.artworkId);
        res.status(200).json({inWishlist:!!item});
    } catch (error) {
        next(error);
    }
})

// Request a new custom work (Buyer)
routing.post("/commission/request", middlewares.auth, async (req, res, next) => {
    try {
        const commission = await commissionServices.customWorkRequest(req.user.id, req.body);
        req.io.emit(`commission-update-${req.body.artistId}`, commission);
        res.status(200).json({ message: "Request sent!", commission});
    } catch (error) {
        next(error);
    }
})

// Get commissions for an artist
routing.get("/commission/artist", middlewares.auth, async (req, res, next) => {
    try {
        const commissions = await commissionServices.artistCommissions(req.user.id);
        res.status(200).json(commissions);
    } catch (error) {
        next(error);
    }
})

// Get commissions for an artist
routing.get("/commission/buyer", middlewares.auth, async (req, res, next) => {
    try {
        const commissions = await commissionServices.buyerCommissions(req.user.id);
        res.status(200).json(commissions);
    } catch (error) {
        next(error);
    }
})

// Accept or reject a commission request (Artist)
routing.put("/commission/update-status/:id", middlewares.auth, async (req, res, next) => {
    try {
        const commission = await commissionServices.updateCommissionStatus(req.params.id, req.body.status, req.body.price);
        req.io.emit(`commission-update-${commission.buyerId}`, commission);
        res.status(200).json({ message: "Status updated!", commission});
    } catch (error) {
        next(error);
    }
})

// Mock Payment process (Buyer)
routing.put("/commission/pay/:id", middlewares.auth, async (req, res, next) => {
    try {
        const commission = await commissionServices.updateCommissionPaymentDetails(req.params.id);
        req.io.emit(`commission-update-${commission.artistId}`, commission);
        res.status(200).json({ message: "Payment successful!", commission});
    } catch (error) {
        next(error);
    }
})

// Complete commision (Artist)
routing.put("/commission/complete/:id", middlewares.auth, async (req, res, next) => {
    try {
        const commission = await commissionServices.updateCommissionCompleted(req.params.id);
        req.io.emit(`commission-update-${commission.buyerId}`, commission);
        res.status(200).json({ message: "Commission completed!", commission});
    } catch (error) {
        next(error);
    }
})

routing.get("/commission/artists", middlewares.auth, async (req, res, next) => {
    try {
        const artists = await userServices.getArtistsByRole("artist");
        res.status(200).json(artists);
    } catch (error) {
        next(error);
    }
});

// Create a new promotion
routing.post("/promotion/add", middlewares.auth, async (req, res, next) => {
    try {
        const promotion = await promotionServices.addPromotion(req.body); 
        res.status(201).json(promotion);
    } catch (error) {
        next(error);
    }
})

// Fetch all promotions for an artist
routing.get("/promotion/artist/:artistId", middlewares.auth, async (req, res, next) => {
    try {
        const promotions = await promotionServices.fetchPromotions(req.params.artistId); 
        res.status(200).json(promotions);
    } catch (error) {
        next(error);
    }
})

// Fetch all promotions
routing.get("/promotion/all", async (req, res, next) => {
    try {
        const promotions = await promotionServices.fetchAllPromotions(); 
        res.status(200).json(promotions);
    } catch (error) {
        next(error);
    }
})

// Update a promotion
routing.put("/promotion/update/:id", middlewares.auth, async (req, res, next) => {
    try {
        const promotion = await promotionServices.updatePromotion(req.params.id, req.body);
        res.status(200).json(promotion);
    } catch (error) {
        next(error);
    }
})

// Delete a promotion
routing.delete("/promotion/delete/:id", middlewares.auth, async (req, res, next) => {
    try {
        const promotion = await promotionServices.deletePromotion(req.params.id);
        res.status(200).json(promotion);
    } catch (error) {
        next(error);
    }
})

// Fetch promotion performance
routing.get("/promotion/performance/:artistId", middlewares.auth, async (req, res, next) => {
    try {
        const performance = await promotionServices.promotionPerformance(req.params.artistId);
        res.status(200).json(performance);
    } catch (error) {
        next(error);
    }
})

// Update Impressions
routing.put("/promotion/update-impressions/:promotionId", async (req, res, next) => {
    try {
        const promotion = await promotionServices.updateImpressions(req.params.promotionId);
        res.status(200).json(promotion);
    } catch (error) {
        next(error);
    }
})

// Update Impressions
routing.put("/promotion/update-clicks/:promotionId", async (req, res, next) => {
    try {
        const promotion = await promotionServices.updateClicks(req.params.promotionId);
        res.status(200).json(promotion);
    } catch (error) {
        next(error);
    }
})

// Update Impressions
routing.put("/promotion/update-sales/:promotionId", async (req, res, next) => {
    try {
        const promotion = await promotionServices.updateSales(req.params.promotionId);
        res.status(200).json(promotion);
    } catch (error) {
        next(error);
    }
})

// Wild Route
routing.all('**', (req,res)=>{
    res.status(404).send("Page not found");
});

module.exports = routing;