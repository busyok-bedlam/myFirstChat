const MessageModel = require('./models/message.model');
const socketIo = io => {
    io.on('connection', function (socket) {
        console.log("CONNECTED SOCKET ON SERVER");
        socket.join('GENERAL_ROOM');
        socket.on("SEND_MESSAGE_TO_SERVER", content => {

            const data = {
                date: new Date(),
                content,
                username: socket.id
            }
            socket.emit("SEND_MESSAGE_TO_CLIENT", data);
            socket.to("GENERAL_ROOM").emit("SEND_MESSAGE_TO_CLIENT", data);
        })
        socket.on('disconnect', () => {
            console.log("DISCONNECT SOCKET FROM SERVER")
        })
    });
}

module.exports = socketIo;