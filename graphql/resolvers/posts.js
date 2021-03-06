const Post = require("../../models/post.model");
const checkAuth = require("../../helpers/authorization");
const { AuthenticationError } = require("apollo-server-errors");

const User = require("../../models/user.model");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { mal_id, anime, episode, rating, body }, context) {
      const user = checkAuth(context);
      const username = user.username;
      const creator = await User.findOne({ username });

      if (anime.trim() === "") {
        throw new Error("You must enter an anime");
      }
      if (!(episode >= 0)) {
        throw new Error("You must enter a valid episode number");
      }
      if (!(0 <= rating <= 10)) {
        throw new Error("Please rate between 0-10");
      }

      const newPost = new Post({
        mal_id: mal_id,
        anime: anime,
        episode: episode,
        rating: rating,
        body: body,
        user: user.id,
        username: username,
        avatar_url: creator.avatar_url,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      //get the post first
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
