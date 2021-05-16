import React from "react";
import "../styles/AnimeInfo.css";

import { Tag, Link, Divider } from "@geist-ui/react";

export default function AnimeInfo(props) {
  const { animeData, anime, coverUrl } = props;

  return (
    <div className="info-content">
      <div className="info-header">
        <img className="cover-art" src={coverUrl} alt="cover_art.jpg" />
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
              <Link style={{ fontSize: "14px" }} href={animeData.url} color>
                data from MyAnimeList
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
