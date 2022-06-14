const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: Date,
});

const ModelUser = mongoose.model("User", mySchema);

module.exports = { ModelUser };
