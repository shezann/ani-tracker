/* eslint-disable */

import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "../styles/App.css";

import { AuthProvider } from "../context/auth";

function App() {
  const pathname = window.location.pathname;

  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
