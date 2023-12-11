const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user: [{
    type: Schema.ObjectId,
    ref: 'user',
  }]
});

const chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;