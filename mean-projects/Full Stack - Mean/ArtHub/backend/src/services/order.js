const artworkModels = require("../models/artwork");
const orderModels = require("../models/order")

let services = {};

services.placeOrder = async (buyerId, artworkId, artistId, price, paymentMethod, shipping) => {
    try {
        let paymentStatus = "pending";
        let transactionId =null;

        if(paymentMethod === "online") {
            transactionId = `TXN_${Date.now()}`;
            paymentStatus = "completed";
        } else if (paymentMethod === "cod") {
            paymentMethod = "cod";
        }

        const orderObj = {
            buyerId,
            artworkId,
            artistId,
            price,
            paymentStatus,
            transactionId,
            paymentMethod,
            shipping
        }

        const newOrder = await orderModels.addOrder(orderObj);

        if(newOrder) {
            return newOrder;
        } else {
            let err = new Error("Internal server error. Try Again.");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.orderCheckout = async (buyerId, artworkId) => {
    try {
        let artwork = await artworkModels.getArtworkById(artworkId);

        if(!artwork) {
            let err = new Error("Artwork not found");
            err.status = 404;
            throw err;
        }

        const orderObj = {
            buyerId,
            artworkId,
            artistId: artwork.artistId,
            price: artwork.price,
            paymentStatus: "pending"
        }

        const newOrder = await orderModels.addOrder(orderObj);

        if(newOrder) {
            return newOrder;
        } else {
            let err = new Error("Internal server error. Try Again.");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.getBuyerOrders = async (buyerId) => {
    try {
        let orders = await orderModels.getBuyerOrders(buyerId);
        if(orders){
            return orders;
        } else {
            let err = new Error("No purchase history found")
            err.status = 404;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.confirmPayment = async (orderId, transactionId) => {
    try {
        const order = await orderModels.getOrderById(orderId);
        if(!order){
            let err = new Error("Order not found")
            err.status = 404;
            throw err;
        }

        order.paymentStatus = "completed";
        order.transactionId = transactionId;

        await order.save();;

        await artworkModels.updateArtworkStatus(order.artworkId, "sold")

        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = services;