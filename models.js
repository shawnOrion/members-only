const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    title: String,
    password: String,
    email: String,
    status: Boolean,
  })
);

const Message = mongoose.model(
  "Message",
  new Schema({
    date: { type: Date, default: Date.now },
    content: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  })
);

module.exports = { User, Message };
