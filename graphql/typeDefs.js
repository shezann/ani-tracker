const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    anime: String!
    episode: Int!
    body: String
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;
