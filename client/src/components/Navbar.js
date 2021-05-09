/* eslint-disable */
/* eslint-disable */

import React, { useState, useContext } from "react";
import { Button, User, useMediaQuery } from "@geist-ui/react";
import { UserPlus, LogIn, LogOut } from "@geist-ui/react-icons";

import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { AuthContext } from "../context/auth";

export default function Navbar() {
  //GEIST UI MEDIA QUERY
  const isXS = useMediaQuery("xs");
  const btnSize = isXS ? "mini" : "small";

  const { user, logout } = useContext(AuthContext);
  // TODO: use user.avatar_url here instead and if it's empty use the alt tag
  const userImgURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_ug6bYQJ9ilkd9rMKpqQ2fnOIYC5u4go_A&usqp=CAU";

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const loginHandler = () => setShowLogin(true);
  const registerHandler = () => setShowRegister(true);

  const closeHandler = (event) => {
    setShowLogin(false);
    setShowRegister(false);
  };

  //display items
  const navBar = user ? (
    <div className="navbar">
      <div className="btn-container">
        <User
          style={{ marginTop: "10px" }}
          src={userImgURL}
          name={user.username}
        />
        <Button
          onClick={logout}
          size={btnSize}
          type="error"
          ghost
          icon={<LogOut />}
          style={{ marginTop: "5px", marginBottom: "10px" }}
        >
          Logout
        </Button>
      </div>
    </div>
  ) : (
    <div className="navbar">
      <div className="btn-container">
        <div className="logo">
          {isXS ? <h3>anitracker</h3> : <h3>anitracker</h3>}
        </div>

        <div className="sign-btns">
          <Button
            size={btnSize}
            icon={<LogIn />}
            onClick={loginHandler}
            type="secondary"
            ghost
          >
            Login
          </Button>

          <Button
            size={btnSize}
            icon={<UserPlus />}
            onClick={registerHandler}
            type="secondary-light"
            className="register-btn"
          >
            Register
          </Button>

          <Login
            closeHandler={closeHandler}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />
          <Register
            closeHandler={closeHandler}
            showRegister={showRegister}
            setShowRegister={setShowRegister}
          />
        </div>
      </div>
    </div>
  );

  return navBar;
}
