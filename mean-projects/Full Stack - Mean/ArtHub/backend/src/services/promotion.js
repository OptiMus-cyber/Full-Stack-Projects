const artworkModels = require("../models/artwork");
const promotionModels = require("../models/promotion");
const validator = require("../utilities/validator");

let services = {};

services.addPromotion = async(promotionObj) => {
    try {
        validator.validatePromotionDate(promotionObj.startDate, promotionObj.endDate);
        let newPromotion = await promotionModels.addPromotion(promotionObj);
        if(newPromotion){
            return newPromotion;
        } else {
            let err = new Error("Error in creating promotion");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.fetchPromotions = async(artistId) => {
    try {
        let promotions = await promotionModels.fetchPromotions(artistId);
        if(promotions){
            return promotions;
        } else {
            let err = new Error("No promotion found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.fetchAllPromotions = async(artistId) => {
    try {
        let promotions = await promotionModels.fetchAllPromotions();
        if(promotions){
            return promotions;
        } else {
            let err = new Error("No promotion found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updatePromotion = async(id, promotionObj) => {
    try {
        let promotion = await promotionModels.updatePromotion(id, promotionObj);
        if(promotion){
            return promotion;
        } else {
            let err = new Error("Error in updating promotion");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.deletePromotion = async(id) => {
    try {
        let promotionId = await promotionModels.deletePromotion(id);
        if(promotionId){
            return promotionId;
        } else {
            let err = new Error("Error in deleting promotion");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.promotionPerformance = async(artistId) => {
    try {
        let performance = await promotionModels.promotionPerformance(artistId);
        if(performance){
            return performance;
        } else {
            let err = new Error("No performance data found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updateImpressions = async(promotionId) => {
    try {
        let promotion = await promotionModels.updateImpressions(promotionId);
        if(promotion){
            return promotion;
        } else {
            let err = new Error("Error in updating promotion");
            err.status = 406;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updateClicks = async(promotionId) => {
    try {
        let promotion = await promotionModels.updateClicks(promotionId);
        if(promotion){
            return promotion;
        } else {
            let err = new Error("Error in updating promotion");
            err.status = 406;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updateSales = async(artworkId) => {
    try {
        let promotion = await promotionModels.updateSales(artworkId);
        if(promotion){
            return promotion;
        } else {
            let err = new Error("Error in updating promotion");
            err.status = 406;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = services;