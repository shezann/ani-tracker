/* eslint-disable */

import {
  Modal,
  Card,
  Button,
  Description,
  User,
  Text,
  Link,
  useModal,
} from "@geist-ui/react";
import { Heart, MessageSquare, Trash, Power } from "@geist-ui/react-icons";
import React, { useContext } from "react";
import "../styles/Post.css";
import moment from "moment";
import { AuthContext } from "../context/auth";
import Like from "./Like";

import Delete from "./Delete";

export default function Post(props) {
  const {
    id,
    anime,
    episode,
    rating,
    mal_id,
    body,
    username,
    createdAt,
    likeCount,
    commentCount,
    likes,
  } = props.post;

  const { user } = useContext(AuthContext);

  let quality = "";
  rating > 5 ? (quality = "good") : (quality = "bad");

  // TODO: make the functions

  function handleComment() {
    console.log("You are about to comment!");
  }

  return (
    <Card hoverable className="post-card">
      <div className="anime-title">
        <Text h4>{anime}</Text>
        <div className={`show-rating ${quality}`}>
          <h4>{rating}</h4>
        </div>
      </div>
      <Description title={`EPISODE ${episode}`} content={body} />

      <Card.Footer className="card-footer">
        <User
          src="https://react.geist-ui.dev/images/avatar.png"
          name={username}
        >
          <Link underline href={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Link>
        </User>
        <div className="interact-btns">
          {/* FIXME: like btn was here */}
          <Like user={user} data={{ id, likes, likeCount }} />

          <Link href={`/posts/${id}`}>
            <Button
              className="interact-btn comment"
              onClick={handleComment}
              size="small"
              icon={<MessageSquare />}
              auto
            >
              {commentCount}
            </Button>
          </Link>

          <Delete user={user} username={username} postId={id} />
        </div>
      </Card.Footer>
    </Card>
  );
}
