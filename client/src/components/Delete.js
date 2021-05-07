import React from "react";
import { Button, useModal, Modal } from "@geist-ui/react";
import { Trash } from "@geist-ui/react-icons";

import { useHistory } from "react-router";

import { useMutation } from "@apollo/client";
import { DELETE_COMMENT, DELETE_POST } from "../graphql";

import { GET_POSTS } from "../graphql";

export default function Delete(props) {
  const user = props.user;
  const username = props.username;
  const postId = props.postId;
  const commentId = props.commentId;
  const atSinglePost = props.atSinglePost;

  const history = useHistory();

  const { setVisible, bindings } = useModal();

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        setVisible(false);
        history.push("/");

        if (!atSinglePost) {
          const data = proxy.readQuery({ query: GET_POSTS });
          const newData = data.getPosts.filter((post) => post.id !== postId);
          proxy.writeQuery({
            query: GET_POSTS,
            data: { getPosts: newData },
          });
        }
      }
    },
    variables: {
      postId,
      commentId,
    },
  });

  function handleDelete() {
    deletePostOrComment();
  }

  // make different delete buttons based on where it's placed
  let deleteButton;

  if (user && user.username === username) {
    deleteButton = (
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
              <Button auto size="small" type="error" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }

  if (commentId) {
    deleteButton = (
      <Button
        className="interact-btn del"
        iconRight={<Trash />}
        type="error"
        onClick={handleDelete}
        ghost
        auto
        size="small"
      />
    );
  }

  return <div>{deleteButton}</div>;
}
