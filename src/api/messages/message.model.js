const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'chat',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
    },
    message: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

const messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel;