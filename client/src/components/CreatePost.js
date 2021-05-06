/* eslint-disable */

import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import "../styles/Pages.css";
import { Input, Spacer, Modal, AutoComplete, Textarea } from "@geist-ui/react";
import { User, Mail } from "@geist-ui/react-icons";
import { useHistory } from "react-router";
var axios = require("axios");

export default function CreatePost(props) {
  const { showCreatePost, closeHandler, setShowCreatePost } = props;
  const history = useHistory();

  const [options, setOptions] = useState();
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [input, setInput] = useState({
    anime: "",
    episode: "",
    rating: "",
    body: "",
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      setInput({});
      closeHandler();
      history.push("/");
    },
    onError(err) {
      console.log(err);
    },
    variables: input,
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
    createPost();
  }

  function handleEpisode(event) {
    let parsedData = "";
    if (event.target.value) {
      parsedData = parseInt(event.target.value);
    }
    setInput({ ...input, episode: parsedData });
  }
  function handleRating(event) {
    let parsedData = "";
    if (event.target.value) {
      parsedData = parseInt(event.target.value);
    }
    setInput({ ...input, rating: parsedData });
  }
  function handleBody(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <Modal open={showCreatePost} onClose={setShowCreatePost}>
        <form className="register-form">
          <h3>Just finished an episode?</h3>
          <Modal.Subtitle>Share your thoughts</Modal.Subtitle>
          <Spacer y={1} />
          <AutoComplete
            name="anime"
            searching={searching}
            options={options}
            placeholder="Which anime did you watch?"
            onSearch={searchHandler}
            width="100%"
          />

          <Spacer y={0.5} />
          <div className="ep-rating">
            <Input
              className="ep-btn"
              size="mini"
              width="90%"
              label="Episode"
              placeholder="1"
              value={input.episode}
              onChange={handleEpisode}
            />
            <Input
              className="rating-btn"
              size="mini"
              label="Rating"
              placeholder="0-10"
              value={input.rating}
              onChange={handleRating}
            />
          </div>

          <Spacer y={0.5} />
          <Textarea
            width="100%"
            name="body"
            placeholder="What did you think of the episode? Share your thoughts here ..."
            value={input.body}
            onChange={handleBody}
          />
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

const CREATE_POST = gql`
  mutation createPost(
    $anime: String!
    $episode: Int!
    $rating: Int
    $body: String
  ) {
    createPost(anime: $anime, episode: $episode, rating: $rating, body: $body) {
      id
      anime
      episode
      rating
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
