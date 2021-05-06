/* eslint-disable */
import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Navbar from "./Navbar";
import CreatePost from "./CreatePost";
import "../styles/Pages.css";
import { Grid, Divider, Row, Loading, Button } from "@geist-ui/react";
import Post from "./Post";
import { AuthContext } from "../context/auth";
import { GET_POSTS } from "../graphql";

export default function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {}, error } = useQuery(
    GET_POSTS
  );

  const [showCreatePost, setShowCreatePost] = useState(false);
  const createPostHandler = () => setShowCreatePost(true);
  const closeHandler = (event) => {
    setShowCreatePost(false);
  };

  return (
    <div className="home">
      <Navbar />
      <div className="posts-container">
        {user && (
          <Button
            className="fab"
            onClick={createPostHandler}
            auto
            shadow
            type="success"
          >
            Post
          </Button>
        )}

        <CreatePost
          closeHandler={closeHandler}
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
        />

        <Divider volume={2} y={4} align="center">
          Recent Posts
        </Divider>
        {loading ? (
          <Row style={{ padding: "10px 0" }}>
            <Loading />
          </Row>
        ) : (
          //since loading is done we can display the posts here
          <div>
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
