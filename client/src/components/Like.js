import React, { useState, useEffect } from "react";
import { Link, Button } from "@geist-ui/react";
import { Heart, HeartFill } from "@geist-ui/react-icons";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { LIKE_POST } from "../graphql";

import '../styles/Post.css'

export default function Like(props) {
  const { id, likeCount, likes } = props.data;
  const user = props.user;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  // customize button based on if user liked or not
  const likeButton = liked ? (
    <Button
      className="interact-btn like"
      onClick={likePost}
      size="small"
      icon={<HeartFill />}
      auto
    >
      {likeCount}
    </Button>
  ) : (
    <Button
      className="interact-btn like"
      onClick={likePost}
      size="small"
      icon={<Heart />}
      auto
    >
      {likeCount}
    </Button>
  );

  return <div>{likeButton}</div>;
}
