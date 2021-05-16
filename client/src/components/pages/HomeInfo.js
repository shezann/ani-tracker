import React, { useState } from "react";
import Register from "../modals/Register";
import "../../styles/HomeInfo.css";
import { Button, Row, Loading } from "@geist-ui/react";
import TopAnime from "../TopAnime";
var axios = require("axios");

export default function HomeInfo() {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [showRegister, setShowRegister] = useState(false);
  const registerHandler = () => setShowRegister(true);
  const closeHandler = (event) => {
    setShowRegister(false);
  };

  async function getAnimeData() {
    const resTrending = await axios(
      "https://api.jikan.moe/v3/top/anime/1/airing"
    );
    const resUpcoming = await axios(
      "https://api.jikan.moe/v3/top/anime/1/upcoming"
    );

    setTrending(resTrending.data.top);
    setUpcoming(resUpcoming.data.top);

    setLoading(false);
  }

  loading && getAnimeData();

  return (
    <div className="home-info">
      <div className="title-card">
        <h2>Anime is better with friends</h2>
        <h5>Create your account and start sharing today!</h5>
        <div className="join-btn">
          <Button auto shadow type="secondary" onClick={registerHandler}>
            Join Now!
          </Button>
          <Register
            closeHandler={closeHandler}
            showRegister={showRegister}
            setShowRegister={setShowRegister}
          />
        </div>
      </div>

      <div className="trending-now">
        <h2>Trending Now:</h2>
        {loading ? (
          <Row style={{ padding: "10px 0" }}>
            <Loading />
          </Row>
        ) : (
          <TopAnime anime={trending} />
        )}
      </div>

      <div className="upcoming">
        <h2>Top Upcoming:</h2>
        {loading ? (
          <Row style={{ padding: "10px 0" }}>
            <Loading />
          </Row>
        ) : (
          <TopAnime anime={upcoming} />
        )}
      </div>
    </div>
  );
}
