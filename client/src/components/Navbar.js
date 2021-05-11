import React, { useState, useContext } from "react";
import { Button, User, useMediaQuery, Link } from "@geist-ui/react";
import { UserPlus, LogIn, LogOut, Settings } from "@geist-ui/react-icons";

import "../styles/Navbar.css";
import Register from "./modals/Register";
import Login from "./modals/Login";
import { AuthContext } from "../context/auth";

export default function Navbar() {
  //GEIST UI MEDIA QUERY
  const isXS = useMediaQuery("xs");
  const btnSize = isXS ? "mini" : "small";

  const { user, logout, login } = useContext(AuthContext);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const loginHandler = () => setShowLogin(true);
  const registerHandler = () => setShowRegister(true);

  const closeHandler = (event) => {
    setShowLogin(false);
    setShowRegister(false);
  };

  // FOR GUEST USERS
  const guest = {
    username: "guest",
    password: "guest",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWEwZjExMDliMDEzN2NlZmVhMDhkYSIsImVtYWlsIjoiZ3Vlc3RAZ3Vlc3QuY29tIiwidXNlcm5hbWUiOiJndWVzdCIsImF2YXRhcl91cmwiOiJodHRwczovL3d3dy50ZW5mb3J1bXMuY29tL2dlZWsvZ2Fycy9pbWFnZXMvMi90eXBlcy90aHVtYl8xNTk1MTExODg4MHVzZXIucG5nIiwiaWF0IjoxNjIwNzA5NTYxLCJleHAiOjE2MjA3OTU5NjF9.Avp7OxdOQInT5aywAJ8Qvh0g-tO25k1PVIXKkwLT-sk",
  };
  function loginGuest() {
    login(guest);
  }

  //display items
  const navBar = user ? (
    <div className="navbar">
      <div className="btn-container">
        <Link href="/">
          <User
            style={{ marginTop: "10px" }}
            src={user.avatar_url}
            name={user.username}
          />
        </Link>
        <div className="right-btns">
          <Button
            onClick={logout}
            size={btnSize}
            type="error"
            ghost
            icon={<LogOut />}
            style={{
              marginTop: "5px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          >
            Logout
          </Button>
          <Link href="/user">
            <Button
              size={btnSize}
              auto
              type="secondary"
              ghost
              icon={<Settings />}
              style={{ marginTop: "5px", marginBottom: "10px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="navbar">
      <div className="btn-container">
        <div className="logo">
          {isXS ? <h3>anitracker</h3> : <h3>anitracker</h3>}
        </div>

        <div className="sign-btns">
          {!isXS && (
            <Button
              size={btnSize}
              icon={<LogIn />}
              onClick={loginGuest}
              ghost
              type="success"
              auto
              style={{ marginRight: "0.5rem" }}
            >
              Guest Login
            </Button>
          )}

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
