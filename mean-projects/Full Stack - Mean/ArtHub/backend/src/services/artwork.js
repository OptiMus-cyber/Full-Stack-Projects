const artworkModels = require("../models/artwork");

let services = {};

// Get Artworks
services.fetchArtworks = async (filter) => {
    try {
        let artworks = await artworkModels.fetchArtworks(filter);
        if(artworks){
            return artworks;
        } else {
            let err = new Error("No artwork found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        throw error;
    }
};

// Get Artwork
services.getArtwork = async (artworkId) => {
    try {
        let artwork = await artworkModels.getArtwork(artworkId);
        if(artwork){
            return artwork;
        } else {
            let err = new Error("No artwork found");
            err.status = 404;
            throw err;
        }
    } catch (error) {
        throw error;
    }
};

// Upload Artwork
services.uploadArtwork = async (artworkObj, files, artistId) => {
    try {
        if(!files || files.length ===0) {
            let err = new Error("No images uploaded");
            err.status = 400;
            throw err;
        }

        const { title, description, price, category,} = artworkObj;

        const images = files.map(file => "http://localhost:4500/uploads/"+file.filename);

        const newArtworkObj = {
            title,
            description,
            images,
            price,
            category,
            artistId
        };

        const newArtwork = await artworkModels.addArtwork(newArtworkObj);

        if(newArtwork){
            return newArtwork;
        } else {
            let err = new Error("Server error");
            err.status = 500;
            throw err;
        }        
    } catch (error) {
        throw error;
    }
};

module.exports = services;