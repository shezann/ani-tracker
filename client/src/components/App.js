/* eslint-disable */

import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SinglePost from "./SinglePost";
import "../styles/App.css";

import { AuthProvider } from "../context/auth";

function App() {
  const pathname = window.location.pathname;

  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:postId" component={SinglePost} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
