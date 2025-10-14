const connection = require("../utilities/connection");

let models = {};

models.checkWishlist = async(userId, artworkId) => {
    try {
        let wishlistModel = await connection.getWishlistCollection();
        let wishlist = await wishlistModel.findOne({userId, artworkId});
        if(wishlist) {
            return wishlist;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.addWishlistItem = async(wishlistItem) => {
    try {
        let wishlistModel = await connection.getWishlistCollection();
        let wishlist = await wishlistModel.create(wishlistItem);
        if(wishlist) {
            return wishlist;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.getUserWishlist = async (userId) => {
    try {
        let wishlistModel = await connection.getWishlistCollection();
        const userWishlist = await wishlistModel.find({userId}).populate("artworkId");
        if(userWishlist.length){
            return userWishlist;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.removeFromUserWishlist = async (userId, artworkId) => {
    try {
        let wishlistModel = await connection.getWishlistCollection();
        const respone = await wishlistModel.deleteOne({ userId, artworkId});
        if(respone.deletedCount){
            return artworkId;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = models;