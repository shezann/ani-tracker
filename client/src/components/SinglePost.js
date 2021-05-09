import React, { useContext, useState } from "react";
import {
  Loading,
  Row,
  Note,
  Textarea,
  User,
  Button,
  useMediaQuery,
  Divider,
  Card,
  Tag,
  Link,
  Spacer,
} from "@geist-ui/react";
import { ChevronLeft } from "@geist-ui/react-icons";
import ProgressBar from "./ProgressBar";

import "../styles/SinglePost.css";
import Navbar from "./Navbar";
import Like from "./Like";
import Delete from "./Delete";
import AnimeInfo from "./AnimeInfo";

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
  const [submitStatus, setSubmitStatus] = useState(true);
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

  function handleCommentChange(value) {
    if (value !== "") {
      setSubmitStatus(false);
    }
    setComment(value);
  }

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

    // TODO: get user avatar
    const user_avatar =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_ug6bYQJ9ilkd9rMKpqQ2fnOIYC5u4go_A&usqp=CAU";

    let quality = "";
    rating > 5 ? (quality = "good") : (quality = "bad");

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

        <div>
          {/* TODO: display anime info here */}
          <AnimeInfo animeData={animeData} anime={anime} />

          <div className="review-box">
            <div className="review-text">
              <div className={`review-rating ${quality}`}>
                <h1>{rating}</h1>
              </div>
              <Card>
                <div className="avatar-text">
                  <img
                    className="user-avatar"
                    style={{ marginTop: "10px" }}
                    src={user_avatar}
                    alt="user_avatar.jpg"
                  />
                  <div className="username-ep">
                    <h2>{username}'s review</h2>
                    <h4>
                      Episode: {episode} of {animeData.episodes}
                    </h4>
                  </div>
                </div>

                <div className="body">
                  <ProgressBar
                    currentEpisode={episode}
                    totalEpisodes={animeData.episodes}
                  />
                  <p>{body}</p>
                </div>

                <Card.Footer className="review-footer">
                  <p> Posted {moment(createdAt).fromNow(false)}</p>
                  <div className="like-delete-btn">
                    <Like
                      user={user}
                      data={{ id, likes, likeCount }}
                      className="like-btn"
                    />
                    <Delete
                      user={user}
                      username={username}
                      postId={id}
                      atSinglePost={true}
                    />
                  </div>
                </Card.Footer>
              </Card>
            </div>

            <Spacer y={1} />
            <Divider />
            <Spacer y={1} />

            {/* TODO: enter comment text area and button here */}
            <div className="comment-container">
              <div className="create-comment">
                <Textarea
                  width="100%"
                  placeholder="Add a comment"
                  minHeight="20px"
                  value={comment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                />
                <Button
                  type="success"
                  ghost
                  auto
                  disabled={submitStatus}
                  onClick={handleCommentSubmit}
                  className="submit-btn"
                >
                  Submit
                </Button>
              </div>

              <Spacer y={1} />

              <Divider align="start">
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </Divider>
              <Spacer y={2} />

              {comments.map((comment) => (
                <div key={comment.id} className="user-comment">
                  {/* TODO: fix profile picture */}
                  <User
                    style={{ marginTop: "10px" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_ug6bYQJ9ilkd9rMKpqQ2fnOIYC5u4go_A&usqp=CAU"
                    name={comment.username}
                    className="comment-avatar"
                  >
                    {moment(comment.createdAt).fromNow(true)}
                  </User>

                  <div className="user-comment-content">
                    <p>{comment.body}</p>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="single-post-container">{output}</div>
    </div>
  );
}
