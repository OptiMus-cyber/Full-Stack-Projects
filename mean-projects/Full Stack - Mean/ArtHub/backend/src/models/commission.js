const connection = require("../utilities/connection");

let models = {};

models.customWorkRequest = async(commissionObj) => {
    try {
        const commissionModel = await connection.getCommissionCollection();
        const commission = await commissionModel.create(commissionObj);
        if(commission) {
            return commission;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.artistCommissions = async(artistId) => {
    try {
        const commissionModel = await connection.getCommissionCollection();
        const commissions = await commissionModel.find({artistId}).populate("buyerId");
        if(commissions) {
            return commissions;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.buyerCommissions = async(buyerId) => {
    try {
        const commissionModel = await connection.getCommissionCollection();
        const commissions = await commissionModel.find({buyerId}).populate("artistId");
        if(commissions) {
            return commissions;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updateCommissionStatus = async(id, status, price) => {
    try {
        const commissionModel = await connection.getCommissionCollection();
        const commission = await commissionModel.findByIdAndUpdate(id, {$set: {status, price}}, {new: true});
        if(commission) {
            return commission;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updateCommissionPaymentDetails = async(id, transactionId) => {
    try {
        const commissionModel = await connection.getCommissionCollection();
        const commission = await commissionModel.findByIdAndUpdate(id, {$set: {status:"payment_completed", transactionId}}, {new: true});
        if(commission) {
            return commission;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updateCommissionCompleted = async(id, transactionId) => {
    try {
        const commissionModel = await connection.getCommissionCollection();
        const commission = await commissionModel.findByIdAndUpdate(id, {$set: {status:"completed"}}, {new: true});
        if(commission) {
            return commission;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = models;