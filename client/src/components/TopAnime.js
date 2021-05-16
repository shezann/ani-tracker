import React, { useState } from "react";
import "../styles/TopAnime.css";
import Tilt from "react-parallax-tilt";
import { useMediaQuery } from "@geist-ui/react";

export default function TopAnime(props) {
  let animeCount = 6;
  const isMD = useMediaQuery("md");
  isMD ? (animeCount = 5) : (animeCount = 6);

  const [scale] = useState(1.15);

  const top6 = [];

  for (let index = 0; index < animeCount; index++) {
    top6.push(props.anime[index]);
  }

  return (
    <div className="container">
      {top6.map((anime) => {
        return (
          <div className="anime-card" key={anime.mal_id}>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={scale}
              transitionSpeed={2500}
            >
              <img
                src={anime.image_url.replace(".jpg", "l.jpg")}
                alt=""
                className="top-anime-cover-art"
              />
              <span>{anime.title}</span>
            </Tilt>
          </div>
        );
      })}
    </div>
  );
}
