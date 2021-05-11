import React from "react";
import "../../styles/HomeInfo.css";
import { Card, Grid } from "@geist-ui/react";

export default function HomeInfo() {
  return (
    <div className="home-info">
      <div className="title-card">
        <h1>anitracker</h1>
        <h2>anime is better with friends</h2>
      </div>

      <div className="info-section">
        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={12}>
            <Card shadow width="100%">
              <h3>Review Anime </h3>
            </Card>
          </Grid>
          <Grid xs={12} md={12}>
            <Card shadow width="100%">
              <h3>Search Engine </h3>
            </Card>
          </Grid>
          <Grid xs={12} md={8}>
            <Card shadow width="100%">
              <h3>Connected to MAL</h3>
            </Card>
          </Grid>
          <Grid xs={12} md={8}>
            <Card shadow width="100%">
              <h3>Comment on Posts</h3>
            </Card>
          </Grid>
          <Grid xs={12} md={8}>
            <Card shadow width="100%">
              <h3>Coming Soon...</h3>
            </Card>
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}
