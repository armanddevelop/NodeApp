const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  date: Date,
  fileUrl: String,
});

const ModelMessages = mongoose.model("Message", mySchema);

module.exports = { ModelMessages };
