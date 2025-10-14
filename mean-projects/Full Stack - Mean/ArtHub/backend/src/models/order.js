const connection = require("../utilities/connection");

let models = {};

models.addOrder = async (orderObj) => {
    try {
        let orderModel = await connection.getOrderCollection();
        let newOrder = await orderModel.create(orderObj);
        if(newOrder) {
            return newOrder;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.getBuyerOrders = async (buyerId) => {
    try {
        let orderModel = await connection.getOrderCollection();
        let orders = await orderModel.find({buyerId}).populate("artworkId");
        if(orders.length) {
            return orders;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.getOrderById = async (orderId) => {
    try {
        let orderModel = await connection.getOrderCollection();
        let order = await orderModel.findById(orderId);
        if(order) {
            return order;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = models;