const artworkModels = require("../models/artwork");
const orderModels = require("../models/order")
const wishlistModels = require("../models/wishlist");
const { use } = require("../routes/routing");

let services = {};

services.addToWishlist = async (userId, artworkId) => {
    try {
        const existingItem = await wishlistModels.checkWishlist(userId, artworkId);

        if(existingItem){
            let err = new Error("Already in wishlist");
            err.status = 400;
            throw err;
        }

        const wishlistItem ={
            userId,
            artworkId
        };

        let newWishlistItem = await wishlistModels.addWishlistItem(wishlistItem);

        if(newWishlistItem) {
            return newWishlistItem;
        } else {
            let err = new Error("Internal server error");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.getWishlist = async (userId) => {
    try {
        let userWishlist = await wishlistModels.getUserWishlist(userId);
        if(userWishlist){
            return userWishlist;
        } else {
            let err = new Error("Wishlist is Empty");
            err.status = 404;
            throw err; 
        }
    } catch (error) {
        throw error;
    }
}

services.checkUserArtworkWishlist = async (userId, artworkId) => {
    try {
        let userArtworkWishlist = await wishlistModels.checkWishlist(userId, artworkId);
        if(userArtworkWishlist){
            return userArtworkWishlist;
        } else {
            let err = new Error("Not in the wishlist.");
            err.status = 404;
            throw err; 
        }
    } catch (error) {
        throw error;
    }
}

services.removeFromWishlist = async (userId, artworkId) => {
    try {
        let resArtworkId = await wishlistModels.removeFromUserWishlist(userId, artworkId);
        if(resArtworkId){
            return resArtworkId;
        } else {
            let err = new Error("Internal server error");
            err.status = 500;
            throw err; 
        }
    } catch (error) {
        throw error;
    }
}



module.exports = services;