import React, { useContext } from "react";
import { Loading, Row } from "@geist-ui/react";

import { GET_POST } from "../graphql";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import moment from "moment";

import Navbar from "./Navbar";
import Like from "./Like";
import Delete from "./Delete";

export default function SinglePost(props) {
  const postId = props.match.params.postId;

  const { user } = useContext(AuthContext);

  const { data: { getPost } = {} } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  let output;
  if (!getPost) {
    output = (
      <Row style={{ padding: "10px 0" }}>
        <Loading />
      </Row>
    );
  } else {
    const {
      id,
      anime,
      episode,
      body,
      comments,
      likes,
      likeCount,
      commentCount,
      username,
      createdAt,
    } = getPost;

    output = (
      <div className="single-post-container">
        <h1>{anime}</h1>
        <h2>{episode}</h2>
        <p>{body}</p>
        <p>{username}</p>
        <Like user={user} data={{ id, likes, likeCount }} />

        <Delete user={user} username={username} postId={id} />

        <p> {moment(createdAt).fromNow(false)}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {output}
    </div>
  );
}
