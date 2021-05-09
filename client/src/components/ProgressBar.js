import React, { useState } from "react";
import { Progress, useTheme } from "@geist-ui/react";

export default function ProgressBar(props) {
  const { currentEpisode, totalEpisodes } = props;

  const theme = useTheme();
  const colors = {
    20: "#000",
    40: "#000",
    60: "#000",
    80: "#000",
  };

  let output = "";
  if (totalEpisodes !== 0) {
    const value = (currentEpisode / totalEpisodes) * 100;
    output = <Progress value={value} colors={colors} />;
  }

  return <div>{output}</div>;
}
