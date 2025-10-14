const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet= require('helmet');
require('dotenv').config();

const router = require("./routes/routing");
const requestLogger = require("./utilities/requestLogger");
const errorLogger = require("./utilities/errorLogger");
const create = require('./models/setupdb');

const app = express();

app.use(helmet());
app.use(helmet.frameguard());
app.use(cors());
app.use((req,res,next) => { 
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
})
app.use(express.json({ limit: "512mb"}));
app.use(express.urlencoded({ limit: "512mb", extended:true}));
app.use("/uploads", express.static(path.join(__dirname, "assets/uploads")));

app.use(requestLogger);

// Web Socket Setup
const server = require('http').createServer(app);
const io = require('socket.io') (server, {
    cors: {origin: "*"}
});

app.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

app.use('/api', (req, res, next) => {
    req.io = io;
    next();
});
app.use('/api', router);

app.use(errorLogger);

// io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("disconnect", () => {
//         console.log("User disconnected: ", socket.id);
//     })
// })

server.listen(process.env.PORT||3200, ()=>{
    console.log("Server is listening on port", process.env.PORT||3200);
});

module.exports = app;