import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import "../styles/App.css";

import { AuthProvider } from "../context/auth";

function App() {
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
