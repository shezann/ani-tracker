/* eslint-disable */

import {
  Row,
  Card,
  Button,
  Description,
  User,
  Text,
  Link,
  Badge,
} from "@geist-ui/react";
import { Heart, MessageSquare } from "@geist-ui/react-icons";
import React from "react";
import "../styles/Post.css";
import moment from "moment";
//import { Link } from "react-router-dom";

export default function Post(props) {
  const {
    id,
    anime,
    episode,
    rating,
    body,
    username,
    createdAt,
    likeCount,
    commentCount,
    likes,
  } = props.post;

  let quality = "";
  rating > 5 ? (quality = "good") : (quality = "bad");

  // TODO: make the functions
  function handleLike() {
    console.log("Liked the post!");
  }

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
          <Button onClick={handleLike} size="small" icon={<Heart />} auto>
            {likeCount}
          </Button>
          <Button
            onClick={handleComment}
            size="small"
            icon={<MessageSquare />}
            auto
          >
            {commentCount}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
