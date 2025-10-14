const { Schema, default: mongoose } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
// Mongoose.set('useCreateIndex', true)
const url = "mongodb://127.0.0.1:27017/arthub_db";

const UserSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artist", "buyer"], default: "buyer", required: true },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" },
    socialLinks: {
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" }
    },
    isVerified: {type: Boolean, default: false},
    verificationToken: {type: String, default: null}
}, { collection: "user", timestamps: true });

UserSchema.index({ role: 1 });

const artworkSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    images: [{ type: String, required: true }],
    price: { type: Number, require: true, min: 0 },
    category: { type: String, required: true, index: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, enum: ["available", "sold"], default: "available" },
}, { collection: "artwork", timestamps: true })

const orderSchema = Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
    artworkId: { type: mongoose.Schema.Types.ObjectId, ref: "artwork", required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ["online", "cod"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    transactionId: { type: String, default: null },
    shipping: {
        fullName: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true}
    }
}, { collection: "order", timestamps: true })

const wishlistSchema = Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    artworkId: { type: mongoose.Schema.Types.ObjectId, ref: "artwork", required: true },
}, { collection: "wishlist", timestamps: true });

wishlistSchema.index({ userId: 1, artworkId: 1 }, { unique: true });

const commissionSchema = Schema({
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0 },
    status: { type: String, enum: ["pending", "accepted", "payment_requested", "payment_completed", "in_progress", "completed", "declined"], default: "pending" },
    transactionId: { type: String, deafult: null }
}, { collection: "commission", timestamps: true });

const promotionSchema = Schema({
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    artworkId: { type: mongoose.Schema.Types.ObjectId, ref: "artwork", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    promotionType: { type: String, enum: ["featured", "discount"], default: "discount" },
    discount: { type: Number, min: 0, default: 0 }, // Only for "discount" type
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true, index: true },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { collection: "promotion", timestamps: true });

let collection = {};

collection.getUserCollection = async () => {
    try {
        let database = await Mongoose.connect(url);
        let model = await database.model('user', UserSchema);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    }
}

collection.getArtworkCollection = async () => {
    try {
        let database = await Mongoose.connect(url);
        let model = await database.model('artwork', artworkSchema);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    }
}

collection.getOrderCollection = async () => {
    try {
        let database = await Mongoose.connect(url);
        let model = await database.model('order', orderSchema);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    }
}

collection.getWishlistCollection = async () => {
    try {
        let database = await Mongoose.connect(url);
        let model = await database.model('wishlist', wishlistSchema);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    }
}

collection.getCommissionCollection = async () => {
    try {
        let database = await Mongoose.connect(url);
        let model = await database.model('commission', commissionSchema);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    }
}

collection.getPromotionCollection = async () => {
    try {
        let database = await Mongoose.connect(url);
        let model = await database.model('promotion', promotionSchema);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    }
}

module.exports = collection;