const connection = require("../utilities/connection");

let models = {};

models.addPromotion = async (promotionObj) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const newPromotion = await promotionModel.create(promotionObj);
        if(newPromotion){
            return newPromotion;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.fetchPromotions = async (artistId) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotions = await promotionModel.find({artistId}).populate("artworkId");
        if(promotions.length){
            return promotions;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.fetchAllPromotions = async (artistId) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotions = await promotionModel.find().populate("artworkId");
        if(promotions.length){
            return promotions;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updatePromotion = async (id, promotionObj) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotion = await promotionModel.findByIdAndUpdate(id, promotionObj, { new: true});
        if(promotion){
            return promotion;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.deletePromotion = async (id) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const res = await promotionModel.deleteOne({_id:id});
        if(res.deletedCount){
            return id;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.promotionPerformance = async (artistId) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotions = await promotionModel.find({artistId});
        const performance = promotions.map(promo => ({
            titile: promo.title,
            clicks: promo.clicks,
            impressions: promo.impressions,
            discount: promo.discount
        }))
        if(promotions.length){
            return performance;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updateImpressions = async(promotionId) =>{
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotion = await promotionModel.findByIdAndUpdate(promotionId,{$inc:{impressions:1}});
        if(promotion){
            return promotion;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updateClicks = async(promotionId) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotion = await promotionModel.findByIdAndUpdate(promotionId,{$inc:{clicks:1}});
        if(promotion){
            return promotion;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}
models.updateSales = async(artworkId) => {
    try {
        const promotionModel = await connection.getPromotionCollection();
        const promotion = await promotionModel.findOneAndUpdate({artworkId},{$inc:{sales:1}});
        if(promotion){
            return promotion;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = models;