const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    date: { type: Date },
    username: { type: String },
    content: { type: String }
}, {
    versionKey: false,
    collection: "MessageCollection"
})
module.exports = mongoose.model("MessageModel", MessageSchema);