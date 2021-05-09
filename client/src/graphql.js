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
      mal_id
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

export const GET_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      anime
      episode
      body
      mal_id
      rating
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
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
    $mal_id: Int!
  ) {
    createPost(
      anime: $anime
      episode: $episode
      rating: $rating
      body: $body
      mal_id: $mal_id
    ) {
      id
      anime
      episode
      rating
      body
      mal_id
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

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export const ADD_AVATAR = gql`
  mutation($username: String!, $avatar_url: String!) {
    addAvatar(username: $username, avatar_url: $avatar_url) {
      id
      email
      username
      avatar_url
    }
  }
`;

//Subscription
