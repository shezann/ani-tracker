/* eslint-disable */

import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "../styles/App.css";

//TODO: create a navbar for HomePage

function App() {
  const pathname = window.location.pathname;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
