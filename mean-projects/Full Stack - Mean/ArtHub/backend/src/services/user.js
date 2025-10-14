const userModels = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const validator = require("../utilities/validator");

let services = {};

// Signup User
services.register = async (userObj) => {
    try {
        const { name, email, password, role } = userObj;

        validator.validateEmail(email);
        validator.validatePassword(password);

        // Check if user already exists
        const existingUser = await userModels.existingUserByEmail(email);
        if (existingUser) {
            let error = new Error("Email id already in use");
            error.status = 400;
            throw error;
        }

        // Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user with a verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const newUserObj = {
            name,
            email,
            password: hashedPassword,
            role: role || "buyer",
            isVerified: false,
            verificationToken
        }

        const newUser = await userModels.register(newUserObj);

        // Send verification email
        // const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={verificationToken}`;

        // const transporter = nodemailer.createTransport({
        //     service: "smtp.gmail.com",
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // })

        // await transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: "Verify Your Email - Arthub",
        //     html: `<p>Click the link below to verify your email</p><a href="${verificationLink}">Verify Email</a>`,
        // })

        return newUser;

    } catch (error) {
        throw error;
    }
}

// Verify user email
services.verifyEmail = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const verifyUser = await userModels.verifyEmail(decoded.email);
        if(verifyUser){
            return verifyUser;
        } else {
            let err = new Error("Invalid or expired token");
            err.status = 400;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

// Login User
const generateToken = (user) => {
    return jwt.sign({
        id:user._id, 
        name: user.name,
        email:user.email,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

services.login = async (email, password) => {
    try {
        // Check if user exists
        let user = await userModels.existingUserByEmail(email);
    
        if(!user) {
            let err = new Error("Invalid email or password");
            err.status = 400;
            throw err;
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            let err = new Error("Invalid email or password");
            err.status = 400;
            throw err;
        }

        // Generate token and send response
        return {
            message: "Login successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: generateToken(user)
        };
    } catch (error) {
        throw error;
    }
}

// Get User Profile
services.getUserProfile = async (userId) => {
    try {
        let user = await userModels.userById(userId);
        if(!user) {
            let err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        return user;
    } catch (error) {
        throw error;
    }
}

// Get Users by Role
services.getArtistsByRole = async (role) => {
    try {
        let user = await userModels.userByRole(role);
        if(!user) {
            let err = new Error("No artist available");
            err.status = 404;
            throw err;
        }
        return user;
    } catch (error) {
        throw error;
    }
}

// Update User Profile
services.updateUserProfile = async (userId, userObj) => {
    try {  
        validator.validateEmail(userObj.email);

        // Hashed Password
        let hashedPassword = ''; 
        if(userObj.password){
            hashedPassword = await bcrypt.hash(userObj.password, 10);
        }
        let updateUser = await userModels.updateUserProfile(userId, hashedPassword, userObj);
        if(!updateUser) {
            let err = new Error("Error updating profile");
            err.status = 406;
            throw err;
        }
        return updateUser;
    } catch (error) {
        throw error;
    }
}

module.exports = services;