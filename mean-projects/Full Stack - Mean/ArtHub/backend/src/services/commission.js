const commissionModels = require("../models/commission");

let services = {};
 
services.customWorkRequest = async (buyerId, commissionObj) => {
    try {
        let newCommissionObj = {
            buyerId,
            artistId: commissionObj.artistId,
            description: commissionObj.description
        }
        let commission = await commissionModels.customWorkRequest(newCommissionObj);
        if(commission) {
            return commission;
        } else {
            let err = new Error("Error in fetching commission");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.artistCommissions = async (artistId) => {
    try {
        let commissions = await commissionModels.artistCommissions(artistId);
        if(commissions) {
            return commissions;
        } else {
            let err = new Error("Error in fetching commission");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.buyerCommissions = async (buyerId) => {
    try {
        let commissions = await commissionModels.buyerCommissions(buyerId);
        if(commissions) {
            return commissions;
        } else {
            let err = new Error("Error in fetching commission");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updateCommissionStatus = async (id, status, price) => {
    try {
        let commission = await commissionModels.updateCommissionStatus(id, status, price);
        if(commission) {
            return commission;
        } else {
            let err = new Error("Error in updating status");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updateCommissionPaymentDetails = async (id) => {
    try {
        const transactionId = `TXN${Date.now()}`;
        let commission = await commissionModels.updateCommissionPaymentDetails(id, transactionId);
        if(commission) {
            return commission;
        } else {
            let err = new Error("Payment failed");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

services.updateCommissionCompleted = async (id) => {
    try {
        let commission = await commissionModels.updateCommissionCompleted(id);
        if(commission) {
            return commission;
        } else {
            let err = new Error("Error completing work");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = services;