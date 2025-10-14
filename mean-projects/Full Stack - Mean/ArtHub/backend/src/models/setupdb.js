const collection = require('../utilities/connection');

exports.setupDb = async () => {
    let User = await collection.getUserCollection();
    await User.deleteMany();
    let Artwork = await collection.getArtworkCollection();
    await Artwork.deleteMany();
    let Order = await collection.getOrderCollection();
    await Order.deleteMany();
    let Wishlist = await collection.getWishlistCollection();
    await Wishlist.deleteMany();
    let Commission = await collection.getCommissionCollection();
    await Commission.deleteMany();
    let Promotion = await collection.getPromotionCollection();
    await Promotion.deleteMany();

    const user1 = await User.create({
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        role: "artist",
        bio: "Digital artist specialing in abstract art",
        socialLinks: {
            instagram: "@johndoe",
            twitter: "@doe_art"
        }
    })

    const user2 = await User.create({
        name: "Alice Smith",
        email: "alice@example.com",
        password: "password",
        role: "buyer",
        bio: "Art enthusiast and collector",
        socialLinks: {
            instagram: "@alice_art"
        }
    })
    
    const artwork1 = await Artwork.create({
        title:"Sunset Dream",
        description: "A beautiful sunset painting with warn colors.",
        images: ["../../assets/artwork_2.jpg", "../../assets/artwork_1.jpg"],
        price:2000,
        category: "Abstract",
        artistId: user1._id
    })

    const artwork2 = await Artwork.create({
        title:"The Lonely Tree",
        description: "A surrel depiction of an old tree in a barren landscape.",
        images: ["../../assets/artwork_1.jpg", "../../assets/artwork_2.jpg"],
        price:2500,
        category: "Surreal",
        artistId: user1._id
    })

    const Wishlist1 = await Wishlist.create({
        userId: user2._id,
        artworkId:artwork2._id
    })

    const Commission1 = await Commission.create({
        artistId: user1._id,
        buyerId: user2._id,
        description: "A custom oil painting of a landscape.",
        price: 5000
    })

    const Promotion1 = await Promotion.create({
        artistId: user1._id,
        artworkId: artwork1._id,
        title:"Big Billion Sale",
        description:"Its the biggest sale ever",
        promotionType: "discount",
        discount: 20,
        startDate: new Date("2025-02-01"),
        endDate: new Date("2025-02-28"),
        impressions: 50,
        clicks: 10,
        sales: 2
    })

    if (user1._id && user2._id && artwork1._id && artwork2._id && Wishlist1._id && Commission1._id && Promotion1._id) return "Insertion Successful"
    else {
        let err = new Error("Insertion failed");
        err.status = 400;
        throw err;
    }
}