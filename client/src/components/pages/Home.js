import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../Navbar";
import CreatePost from "../modals/CreatePost";
import "../../styles/Pages.css";
import { Grid, Divider, Row, Loading, Button } from "@geist-ui/react";
import { Plus } from "@geist-ui/react-icons";

import Post from "../Post";
import HomeInfo from "./HomeInfo";

import { AuthContext } from "../../context/auth";
import { GET_POSTS } from "../../graphql";

export default function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {} } = useQuery(GET_POSTS);


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
            <div className="icon">
              <Plus />
            </div>
          </Button>
        )}

        <CreatePost
          closeHandler={closeHandler}
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
        />

        {/* TODO: make this only visible once user has logged in  */}
        {user ? (
          <div className="loggedin-post-container">
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
        ) : (
          <HomeInfo />
        )}
      </div>
    </div>
  );
}
