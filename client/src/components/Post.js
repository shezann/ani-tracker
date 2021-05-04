/* eslint-disable */

import {
  Row,
  Card,
  Button,
  Description,
  User,
  Text,
  Link,
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
    body,
    username,
    createdAt,
    likeCount,
    commentCount,
    likes,
  } = props.post;

  // TODO: make the functions
  function handleLike() {
    console.log("Liked the post!");
  }

  function handleComment() {
    console.log("You are about to comment!");
  }

  return (
    <Row style={{ flexWrap: "wrap" }} justify="space-around">
      <Card hoverable width="330px">
        <Text h4>{anime}</Text>
        <Description title={`EPISODE ${episode}`} content={body} />

        <Card.Footer className="card-footer">
          <User
            src="https://react.geist-ui.dev/images/avatar.png"
            name="Evil Rabbit"
          >
            <Link underline href={`/posts/${id}`}>
              {moment(createdAt).fromNow(true)}
            </Link>
          </User>
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

          <Heart />
          <MessageSquare />
        </Card.Footer>
      </Card>
    </Row>
  );
}
