import React from "react";
import { Button, useModal, Modal } from "@geist-ui/react";
import { Trash } from "@geist-ui/react-icons";

import { useHistory } from "react-router";

import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../graphql";

import { GET_POSTS } from "../graphql";

export default function Delete(props) {
  const user = props.user;
  const username = props.username;
  const postId = props.postId;

  const history = useHistory();

  //FIXME: this

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      setVisible(false);

      const data = proxy.readQuery({ query: GET_POSTS });

      proxy.writeQuery({
        query: GET_POSTS,
        data: [data.getPosts.filter((post) => post.id !== postId)],
      });

      console.log(data);
    },
    variables: {
      postId,
    },
  });

  const { setVisible, bindings } = useModal();

  function handleDelete() {
    deletePost();
    history.push("/");
  }

  const deleteButton = user && user.username === username && (
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
            <p style={{ marginTop: "0px" }}>Are you sure you want to delete?</p>
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

  return <div>{deleteButton}</div>;
}
