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
            MessageModel.create(data, (err,result) => {
                console.log(result);
                if(err){
                    console.error("Message ERROR",err)
                }
            })
            socket.emit("SEND_MESSAGE_TO_CLIENT", data);
            socket.to("GENERAL_ROOM").emit("SEND_MESSAGE_TO_CLIENT", data);
        })
        socket.on("receiveHistory", () => {
            MessageModel
                .find({})
                .sort({ date: -1 })
                .limit(50)
                .sort({ date: 1})
                .lean()
                .exec( (err,messages) => {
                    if(!err){
                        socket.emit('history',messages);
                    }
                })
        })
        socket.on('disconnect', () => {
            console.log("DISCONNECT SOCKET FROM SERVER")
        })
    });
}

module.exports = socketIo;