import React, { useContext, useState } from "react";
import { Loading, Row, Note, Textarea, Button } from "@geist-ui/react";

import { GET_POST, CREATE_COMMENT } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import moment from "moment";

import Navbar from "./Navbar";
import Like from "./Like";
import Delete from "./Delete";

export default function SinglePost(props) {
  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const { data: { getPost } = {} } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function handleCommentSubmit() {
    createComment();
    setComment("");
  }

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

        {comments.map((comment) => (
          <div key={comment.id}>
            <Note>
              <p>{comment.username}</p>

              {user && user.username === comment.username && (
                <div>
                  <Delete
                    user={user}
                    username={username}
                    postId={id}
                    commentId={comment.id}
                  />
                </div>
              )}
              <p>{moment(createdAt).fromNow(true)}</p>
              <p>{comment.body}</p>
            </Note>
          </div>
        ))}

        <Like user={user} data={{ id, likes, likeCount }} />

        <Delete
          user={user}
          username={username}
          postId={id}
          atSinglePost={true}
        />

        <p> {moment(createdAt).fromNow(false)}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {output}
      <Textarea
        width="50%"
        placeholder="Comment here"
        minHeight="20px"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCommentSubmit}>Submit</Button>
    </div>
  );
}
