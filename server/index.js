const mongoose = require('mongoose')
const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server,{ serveClient: true});

mongoose.connect("mongodb://localhost:27017/mychat", {

})
mongoose.Promise = require('bluebird');

server.listen(7000, () => {
    console.log("SUCCESS")
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'..','clients','index.html'));
})

app.use("/assets",express.static('./src'))

require('./sockets')(io)
