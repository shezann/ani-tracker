/* eslint-disable */

import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import "../styles/Pages.css";
import { Input, Spacer, Modal, AutoComplete } from "@geist-ui/react";
import { User, Mail } from "@geist-ui/react-icons";
import { useHistory } from "react-router";
import { AuthContext } from "../context/auth";
var axios = require("axios");

export default function CreatePost(props) {
  const { showCreatePost, closeHandler, setShowCreatePost } = props;

  const [options, setOptions] = useState();
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [input, setInput] = useState({
    anime: "",
    episode: 0,
    body: "",
  });

  async function search(val) {
    const res = await axios(
      `https://api.jikan.moe/v3/search/anime?q=${val}&limit=4`
    );
    const results = await res.data.results;
    setSearchResults(results);
    setSearching(false);
  }

  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    setSearching(true);

    const animeNames = searchResults.map((x) => {
      return { label: x.title, value: x.title };
    });

    if (currentValue.length > 2) {
      search(currentValue);
    }

    setOptions(animeNames);

    setInput({ ...input, anime: currentValue });
  };

  function handleSubmit() {
    console.log("submit post");
  }

  return (
    <div>
      <Modal open={showCreatePost} onClose={setShowCreatePost}>
        <form className="register-form">
          <h3>Just finished an episode?</h3>
          <Modal.Subtitle>Share your thoughts</Modal.Subtitle>
          <Spacer y={1} />
          <div>Output</div>
          <AutoComplete
            name="anime"
            searching={searching}
            options={options}
            placeholder="Enter here"
            onSearch={searchHandler}
          />
          <Spacer y={0.5} />

          <Spacer y={0.5} />
          <Input size="mini" width="80%" placeholder="0-24" name="episode">
            Episode
          </Input>
          <Spacer y={0.5} />
          <Input
            size="mini"
            width="80%"
            placeholder="Thoughts on the episode?"
            name="body"
          >
            Comments
          </Input>
          <Spacer y={0.5} />
        </form>

        <Modal.Action passive onClick={() => setShowCreatePost(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={handleSubmit}>Post</Modal.Action>
      </Modal>
    </div>
  );
}
