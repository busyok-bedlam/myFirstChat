const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server,{ serveClient: true});
server.listen(7000, () => {
    console.log("SUCCESS")
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'..','clients','index.html'));
})

app.use("/assets",express.static('./src'))

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
        socket.to("GENERAL_ROOM").emit("SEND_MESSAGE_TO_CLIENT",data);
    })
    socket.on('disconnect', () => {
        console.log("DISCONNECT SOCKET FROM SERVER")
    })
});
