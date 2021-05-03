const Post = require("../../models/post.model");
const checkAuth = require("../../helpers/authorization");
const { AuthenticationError } = require("apollo-server-errors");

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
      // FIXME: goes straight to catch, check if there's a fix
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
    async createPost(_, { anime, episode, body }, context) {
      const user = checkAuth(context);

      if (anime.trim() === "") {
        throw new Error("You must enter an anime");
      }
      if (!(episode >= 0)) {
        throw new Error("You must enter a valid episode number");
      }

      const newPost = new Post({
        anime: anime,
        episode: episode,
        body: body,
        user: user.id,
        username: user.username,
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
