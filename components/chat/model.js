const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const ModelChat = mongoose.model("Chat", mySchema);

module.exports = { ModelChat };
