import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import "../styles/Pages.css";
import {
  Input,
  Spacer,
  Modal,
  AutoComplete,
  Textarea,
  useToasts,
} from "@geist-ui/react";
import { useHistory } from "react-router";
import { CREATE_POST, GET_POSTS } from "../graphql";
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
    mal_id: "",
  });

  const [toasts, setToast] = useToasts();

  function shareToast(anime, rating) {
    let msg = "Thanks for sharing!";
    let type = "";
    if (rating <= 3) {
      msg = `Agreed! ${anime} is truly unwatchable.`;
      type = "error";
    } else if (rating <= 7) {
      msg = `I thought, ${anime} was decent. Could've been better tho!`;
      type = "warning";
    } else if (rating <= 9) {
      msg = `Argeed! ${anime} is really good.`;
      type = "success";
    } else {
      msg = `I totally agree! ${anime} is a masterpiece!`;
      type = "success";
    }

    const click = (type) =>
      setToast({
        text: msg,
        type,
        delay: 3000,
      });
    click(type);
  }

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      //use cache for data
      const data = proxy.readQuery({ query: GET_POSTS });
      proxy.writeQuery({
        query: GET_POSTS,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });

      shareToast(input.anime, input.rating);

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
      `https://api.jikan.moe/v3/search/anime?q=${val}&limit=6`
    );
    const results = await res.data.results;
    setSearchResults(results);
    setSearching(false);
  }

  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    setSearching(true);

    //make custom option with images
    const makeOption = (label, value, image_url, episodes) => (
      <AutoComplete.Option value={value}>
        <div className="search-result">
          <img className="search-img" src={image_url} alt={"img_anime.jpg"} />
          <div className="search-text">
            <h4>{label}</h4>
            <p>{episodes} episodes</p>{" "}
          </div>
        </div>
      </AutoComplete.Option>
    );

    const options = searchResults.map((x) => {
      return {
        label: x.title,
        value: x.title,
        image_url: x.image_url,
        episodes: x.episodes,
      };
    });

    //because MAL only searches after 3 min characters
    if (currentValue.length > 2) {
      search(currentValue);
    }

    const customOptions = options.map(({ label, value, image_url, episodes }) =>
      makeOption(label, value, image_url, episodes)
    );
    setOptions(customOptions);

    //FIXME: why is it one character behind aaaaa
    console.log(currentValue);
    setInput({ ...input, anime: currentValue });
  };

  function handleSubmit() {
    createPost();
    setInput({
      anime: "",
      episode: "",
      rating: "",
      body: "",
      mal_id: "",
    });
  }

  function handleAnime(event) {
    setInput({ ...input, anime: event });

    // TODO: filter through the search results with current value and keep storing the id
    const selectedMalId = searchResults.filter((anime) =>
      anime.title.includes(input.anime)
    );

    if (selectedMalId.length > 0) {
      const mal_id = selectedMalId[0].mal_id;
      setInput({ ...input, mal_id: mal_id });
    }
  }
  function handleEpisode(event) {
    const regEx = /^\d{0,3}$/;
    if (event.target.value.match(regEx)) {
      let parsedData = "";
      if (event.target.value) {
        parsedData = parseInt(event.target.value);
      }
      setInput({ ...input, episode: parsedData });
    }
  }
  function handleRating(event) {
    const regEx = /^\d{0,2}$/;

    if (event.target.value.match(regEx)) {
      let parsedData = "";
      if (event.target.value) {
        parsedData = parseInt(event.target.value);
        if (parsedData > 10) {
          parsedData = 10;
        }
      }
      setInput({ ...input, rating: parsedData });
    }
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
            disableFreeSolo
            onChange={handleAnime}
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
