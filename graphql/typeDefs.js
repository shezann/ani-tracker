const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    anime: String!
    episode: Int!
    rating: Int
    body: String
    mal_id: Int!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    avatar_url: String
    createdAt: String!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(
      anime: String!
      episode: Int!
      rating: Int
      body: String
      mal_id: Int!
    ): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addAvatar(username: String!, avatar_url: String!): User!
  }
  type Subscription {
    newPost: Post!
  }
`;
