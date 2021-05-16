import React, { useContext, useState } from "react";
import {
  Loading,
  Row,
  Textarea,
  User,
  Button,
  useMediaQuery,
  Divider,
  Card,
  Spacer,
} from "@geist-ui/react";
import { ChevronLeft } from "@geist-ui/react-icons";
import ProgressBar from "../ProgressBar";

import "../../styles/SinglePost.css";
import Navbar from "../Navbar";
import Like from "../buttons/Like";
import Delete from "../buttons/Delete";
import AnimeInfo from "../AnimeInfo";

import { useHistory } from "react-router";

import { GET_POST, CREATE_COMMENT } from "../../graphql";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/auth";
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
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState({
    synopsis: "",
    episodes: "",
    score: "",
    rank: "",
    premiered: "",
    title_english: "",
    url: "",
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
    onError(err) {
      //TODO: show login page
      console.log(err);
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
      avatar_url,
      createdAt,
    } = getPost;

    // TODO: get user avatar
    let user_avatar =
      "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";
    if (avatar_url) {
      user_avatar = avatar_url;
    }

    comments.forEach((element) => {
      console.log(element);
    });

    let quality = "";
    rating > 5 ? (quality = "good") : (quality = "bad");

    //get cover image from api using anime id
    async function getAnimeData(request_url) {
      const res = await axios(request_url);
      setLoading(false);

      const image_url = await res.data.image_url.replace(".jpg", "l.jpg");
      setAnimeData({
        synopsis: res.data.synopsis,
        episodes: res.data.episodes,
        score: res.data.score,
        rank: res.data.rank,
        premiered: res.data.premiered,
        url: res.data.url,
      });
      setCoverUrl(image_url);
    }
    const request_url = `https://api.jikan.moe/v3/anime/${mal_id}`;

    if (loading) {
      getAnimeData(request_url);
    }

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
          <AnimeInfo coverUrl={coverUrl} animeData={animeData} anime={anime} />

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
                    src={comment.avatar_url}
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
