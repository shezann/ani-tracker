import gql from "graphql-tag";

//Query
export const GET_POSTS = gql`
  {
    getPosts {
      id
      anime
      episode
      rating
      body
      username
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

//Mutations
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $anime: String!
    $episode: Int!
    $rating: Int
    $body: String
  ) {
    createPost(anime: $anime, episode: $episode, rating: $rating, body: $body) {
      id
      anime
      episode
      rating
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

//Subscription
