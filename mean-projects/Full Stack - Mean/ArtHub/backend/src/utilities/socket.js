const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io') (server, {
    cors: {origin: "*"}
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    })
})

let initialiseSocket = () => {
    server.listen(4800, ()=>{
        console.log("Socket is listening on port", 4800);
    });
}

module.exports = {io, initialiseSocket};