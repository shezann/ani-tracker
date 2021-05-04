/* eslint-disable */

import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Navbar from "./Navbar";
import "../styles/Pages.css";
import { Card, Grid } from "@geist-ui/react";
import Post from "./Post";

export default function Home() {
  const { loading, data: { getPosts: posts } = {}, error } = useQuery(
    GET_POSTS_QUERY
  );

  return (
    <div className="home">
      <Navbar />
      {/* TODO: display posts here */}
      <div className="posts-container">
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          //since loading is done we can display the posts here
          <div>
            <h1>Recent Posts</h1>
            <Grid.Container gap={2} justify="flex-start">
              {posts &&
                posts.map((post) => (
                  <Grid key={post.id} xs={24} md={12} lg={8}>
                    <Post post={post} />
                  </Grid>
                ))}
            </Grid.Container>
          </div>
        )}
      </div>
    </div>
  );
}

const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      anime
      episode
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
