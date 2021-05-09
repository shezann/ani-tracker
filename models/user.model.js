const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  avatar_url: String,
  createdAt: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
