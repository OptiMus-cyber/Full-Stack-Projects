const connection = require("../utilities/connection");

let models = {};

models.fetchArtworks = async (filter) => {
    try {
        let model = await connection.getArtworkCollection();
        let User = await connection.getUserCollection();
        let artworks = await model.find({$or:[{title:{$regex: filter.query, $options:"i"}},{description:{$regex: filter.query, $options:"i"}}]}).populate('artistId', 'name').lean();
        if(filter.category) artworks = artworks.filter((artwork)=> artwork.category == filter.category);
        if(filter.artistId) artworks = artworks.filter((artwork)=> artwork.artistId == filter.artistId);
        // let artworks = await model.find().populate('artistId', 'name').lean();
        if(artworks.length){
            return artworks;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.getArtwork = async (artworkId) => {
    try {
        let model = await connection.getArtworkCollection();
        let artwork = await model.findById(artworkId).populate('artistId');
        if(artwork){
            return artwork;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.getArtworkById = async (artworkId) => {
    try {
        let model = await connection.getArtworkCollection();
        let artwork = await model.findById(artworkId);
        if(artwork){
            return artwork;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.addArtwork = async (artworkObj) => {
    try {
        let model = await connection.getArtworkCollection();
        let artwork = await model.create(artworkObj);
        if(artwork){
            return artwork;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

models.updateArtworkStatus = async (artworkId, updatedStatus) => {
    try {
        let model = await connection.getArtworkCollection();
        let artwork = await model.findByIdAndUpdate(artworkId, {$set: {status:updatedStatus}});
        if(artwork.modifiedCount){
            return artworkId;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = models;