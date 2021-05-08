/* eslint-disable */

import React, { useContext, useState } from "react";
import {
  Loading,
  Row,
  Note,
  Textarea,
  Button,
  useMediaQuery,
  Divider,
  Tag,
  Link,
} from "@geist-ui/react";
import { ChevronLeft } from "@geist-ui/react-icons";

import "../styles/SinglePost.css";
import Navbar from "./Navbar";
import Like from "./Like";
import Delete from "./Delete";

import { useHistory } from "react-router";

import { GET_POST, CREATE_COMMENT } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import moment from "moment";
var axios = require("axios");

export default function SinglePost(props) {
  const history = useHistory();

  const isXS = useMediaQuery("xs");

  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  //data about the anime
  const [coverUrl, setCoverUrl] = useState("");
  const [animeData, setAnimeData] = useState({
    synopsis:
      "The appearance of \"quirks,\" newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual. Since he was a child, the ambitious middle schooler has wanted nothing more than to be a hero. Izuku's unfair fate leaves him admiring heroes and taking notes on them whenever he can. But it seems that his persistence has borne some fruit: Izuku meets the number one hero and his personal idol, All Might. All Might's quirk is a unique ability that can be inherited, and he has chosen Izuku to be his successor! Enduring many months of grueling training, Izuku enrolls in UA High, a prestigious high school famous for its excellent hero training program, and this year's freshmen look especially promising. With his bizarre but talented classmates and the looming threat of a villainous organization, Izuku will soon learn what it really means to be a hero.",
    episodes: 13,
    score: 8.32,
    rank: 307,
    premiered: "Spring 2016",
    title_english: "My Hero Academia",
    url: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
  });

  const { data: { getPost } = {} } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function handleCommentSubmit() {
    createComment();
    setComment("");
  }

  let output;
  if (!getPost) {
    output = (
      <Row style={{ padding: "10px 0" }}>
        <Loading />
      </Row>
    );
  } else {
    const {
      id,
      anime,
      mal_id,
      rating,
      episode,
      body,
      comments,
      likes,
      likeCount,
      commentCount,
      username,
      createdAt,
    } = getPost;

    //get cover image from api using anime id
    async function getCover(request_url) {
      const res = await axios(request_url);
      console.log(JSON.stringify(res.data));
      const image_url = await res.data.image_url.replace(".jpg", "l.jpg");
      setCoverUrl(image_url);
    }

    const request_url = `https://api.jikan.moe/v3/anime/${mal_id}`;
    //getCover(request_url);

    //TODO: get synopsis from api

    output = (
      <div>
        {isXS ? (
          <Button
            auto
            size="mini"
            type="secondary"
            onClick={() => history.push("/")}
            iconRight={<ChevronLeft />}
            className="back-btn"
          />
        ) : (
          <Button
            auto
            size="small"
            type="secondary"
            onClick={() => history.push("/")}
            className="back-btn"
          >
            BACK
          </Button>
        )}
        <div className="single-post">
          <div className="post-content">
            <div className="post-header">
              {/* TODO: update link later */}
              <img
                className="cover-art"
                src="https://cdn.myanimelist.net/images/anime/1911/113611l.jpg"
                alt="cover_art.jpg"
              />
              <div className="anime-data-container">
                <div className="anime-data">
                  <h1>
                    <Link href={animeData.url}>{anime}</Link>
                  </h1>

                  <Tag className="tag" type="success" invert>
                    Score: {animeData.score}
                  </Tag>
                  <Tag className="tag" type="secondary">
                    Rank: {animeData.rank}
                  </Tag>
                  <Tag className="tag" type="secondary">
                    Episodes: {animeData.episodes}
                  </Tag>

                  <Divider style={{ marginBottom: "6px" }} />

                  <h4>Synopsis</h4>
                  <p>{animeData.synopsis}</p>

                  <Divider style={{ marginBottom: "6px" }} />
                  <div className="anime-data-footer">
                    <Tag className="tag bottom" type="secondary">
                      Aired: {animeData.premiered}
                    </Tag>
                    <Link
                      style={{ fontSize: "14px" }}
                      href={animeData.url}
                      color
                    >
                      data from MyAnimeList
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* TODO: show the main post here */}
          </div>

          <div className="review-box">
            <div className="review-rating">{rating}</div>

            <div className="review-text">
              <h1>{username}'s review</h1>
              <p>{body}</p>

              <div className="review-buttons">
                <Like user={user} data={{ id, likes, likeCount }} />
                <Delete
                  user={user}
                  username={username}
                  postId={id}
                  atSinglePost={true}
                />
              </div>

              <p> {moment(createdAt).fromNow(false)}</p>
            </div>
          </div>
        </div>

        {comments.map((comment) => (
          <div key={comment.id}>
            <Note>
              <p>{comment.username}</p>

              {user && user.username === comment.username && (
                <div>
                  <Delete
                    user={user}
                    username={username}
                    postId={id}
                    commentId={comment.id}
                  />
                </div>
              )}
              <p>{moment(createdAt).fromNow(true)}</p>
              <p>{comment.body}</p>
            </Note>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="single-post-container">
        {output}
        <Textarea
          width="50%"
          placeholder="Comment here"
          minHeight="20px"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleCommentSubmit}>Submit</Button>
      </div>
    </div>
  );
}
