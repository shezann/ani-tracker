import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import Navbar from "../Navbar";
import "../../styles/Pages.css";
import { ADD_AVATAR } from "../../graphql";
import { useMutation } from "@apollo/client";

import { Input, Display, Image, Button, Note, Spacer } from "@geist-ui/react";

export default function User() {
  const { user } = useContext(AuthContext);
  const [imageURL, setimageURL] = useState("");

  const [addAvatar] = useMutation(ADD_AVATAR, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
    variables: { username: user.username, avatar_url: imageURL },
  });

  return (
    <div>
      <Navbar />
      <div className="user-info-container">
        <Display
          shadow
          caption="Change avatar below. Please relogin to see change."
        >
          <Image width={435} height={200} src={imageURL} />
        </Display>
        <div className="avatar-input-box">
          <Input
            onChange={(e) => setimageURL(e.target.value)}
            width="100%"
            placeholder="Enter an image URL here"
          />
          <Button
            onClick={addAvatar}
            className="change-avatar-btn"
            type="success"
          >
            Change Avatar
          </Button>
        </div>
        <Spacer y={2} />
        <Note type="error">
          This page is under construction. Ability to track all posts and add
          reminders for currently airing anime coming soon!
        </Note>
      </div>
    </div>
  );
}
