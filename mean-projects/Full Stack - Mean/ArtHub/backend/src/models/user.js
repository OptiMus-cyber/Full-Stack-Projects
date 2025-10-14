const connection = require("../utilities/connection");

let models = {};

models.existingUserByEmail = async (email) => {
    try {
        let userModel = await connection.getUserCollection();
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return existingUser;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.userById = async (userId) => {
    try {
        let userModel = await connection.getUserCollection();
        let user = await userModel.findById(userId).select('-password');
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.userByRole = async (role) => {
    try {
        let userModel = await connection.getUserCollection();
        let artists = await userModel.find({role}).select('-password');
        if (artists.length) {
            return artists;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.register = async (userObj) => {
    try {
        let userModel = await connection.getUserCollection();
        let newUser = await userModel.create(userObj);
        if (newUser) {
            return newUser;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.verifyEmail = async (email) => {
    try {
        let userModel = await connection.getUserCollection();
        let res = await userModel.updateOne({ email }, { $set: { isVerified: true, verificationToken: null } });
        if (res.modifiedCount) {
            return email;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

models.updateUserProfile = async (userId, hashedPassword, userObj) => {
    try {
        let userModel = await connection.getUserCollection();
        let updatedUser = {};
        if(hashedPassword){
            updatedUser = await userModel.findByIdAndUpdate( userId, { $set: { name: userObj.name, email: userObj.email, profilePicture: userObj.profilePicture, bio: userObj.bio, socialLinks: userObj.socialLinks, password: hashedPassword} }, {runValidators: true}).select("-password");
        } else {
            updatedUser = await userModel.findByIdAndUpdate( userId, { $set: { name: userObj.name, email: userObj.email, profilePicture: userObj.profilePicture, bio: userObj.bio, socialLinks: userObj.socialLinks } }, {runValidators: true}).select("-password");
        }
        if (updatedUser) {
            return updatedUser;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = models;