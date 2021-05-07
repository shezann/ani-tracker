import React, { useContext, useState } from "react";
import { Loading, Row, Note, Textarea, Button } from "@geist-ui/react";
import "../styles/SinglePost.css";
import Navbar from "./Navbar";
import Like from "./Like";
import Delete from "./Delete";

import { useHistory } from "react-router";

import { GET_POST, CREATE_COMMENT } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import moment from "moment";

export default function SinglePost(props) {
  const history = useHistory();

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
      mal_id,
      episode,
      body,
      comments,
      likes,
      likeCount,
      commentCount,
      username,
      createdAt,
    } = getPost;

    // TODO: get cover image from api using anime id
    // FIXME: don't forget to add l
    console.log(mal_id);
    const cover_url =
      "https://cdn.myanimelist.net/images/anime/1319/92084l.jpg";

    output = (
      <div>
        <div className="single-post">
          <div className="post-content">
            <img className="cover-art" src={cover_url} alt="cover_art.jpg" />
            <div className="post-text">
              <h1>{anime}</h1>
              <span>EPISODE: {episode}</span>
              <p>{body}</p>
            </div>
          </div>

          <p>from {username}</p>
          <Like user={user} data={{ id, likes, likeCount }} />
          <Delete
            user={user}
            username={username}
            postId={id}
            atSinglePost={true}
          />
          <Button auto ghost type="secondary" onClick={() => history.push("/")}>
            BACK
          </Button>
          <p> {moment(createdAt).fromNow(false)}</p>
        </div>

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
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="single-post-container">
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
    </div>
  );
}
