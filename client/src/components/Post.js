import React, { useContext } from "react";
import { Card, Button, Description, User, Text, Link } from "@geist-ui/react";
import { MessageSquare } from "@geist-ui/react-icons";
import "../styles/Post.css";
import moment from "moment";
import { AuthContext } from "../context/auth";
import Like from "./buttons/Like";
import Delete from "./buttons/Delete";

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

  function handleComment() {}

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
