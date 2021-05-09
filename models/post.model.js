const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  anime: String,
  episode: Number,
  rating: Number,
  body: String,
  mal_id: Number,
  username: String,
  avatar_url: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      avatar_url: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
