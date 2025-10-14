const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure directory exists
const uploadPath = path.join(__dirname, "../assets/uploads");
if(!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +"_"+ file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;