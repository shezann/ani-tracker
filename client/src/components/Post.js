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

  const { user } = useContext(AuthContext);

  const { setVisible, bindings } = useModal();

  let quality = "";
  rating > 5 ? (quality = "good") : (quality = "bad");

  // TODO: make the functions
  function handleDelete() {
    console.log("deleting");
  }
  function handleLike() {
    console.log("You are about to comment!");
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
          <Button
            className="interact-btn like"
            onClick={handleLike}
            size="small"
            icon={<Heart />}
            auto
          >
            {likeCount}
          </Button>

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

          {user && user.username === username && (
            <div>
              <Button
                className="interact-btn del"
                iconRight={<Trash />}
                type="error"
                onClick={() => setVisible(true)}
                ghost
                auto
                size="small"
              />
              <div className="modal-content">
                <Modal width="20rem" {...bindings}>
                  <Modal.Content>
                    <h2 style={{ marginBottom: "0px" }}>Delete Post</h2>
                    <p style={{ marginTop: "0px" }}>
                      Are you sure you want to delete?
                    </p>
                  </Modal.Content>
                  <div className="modal-btns">
                    <Button
                      auto
                      size="small"
                      style={{ marginRight: "4px" }}
                      onClick={() => setVisible(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      auto
                      size="small"
                      type="error"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}
