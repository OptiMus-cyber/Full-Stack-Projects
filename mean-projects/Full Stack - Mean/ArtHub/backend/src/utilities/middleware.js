const jwt = require('jsonwebtoken')

let middlewares = {};

middlewares.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
    
        if(!token) {
            let err = new Error("Access Denied");
            err.status = 401;
            throw err;
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            let err = new Error("Invalid Token");
            err.status = 403;
            throw err;
        }
    } catch (error) {
        next(error);
    }
}

middlewares.buyerAuth = (req, res, next) => {
    try {
        if(req.user.role === 'buyer') {
            next();
        } else {
            let err = new Error("Access Denied");
            err.status = 401;
            throw err;
        }
    } catch (error) {
        next(error);
    }
}

middlewares.artistAuth = (req, res, next) => {
    try {
        if(req.user.role === 'artist') {
            next();
        } else {
            let err = new Error("Access Denied");
            err.status = 401;
            throw err;
        }
    } catch (error) {
        next(error);
    }
}

module.exports = middlewares;