import React, { useState } from "react";
import { Button, Modal } from "@geist-ui/react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import Register from "./Register";

export default function Navbar() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const loginHandler = () => setShowLogin(true);
  const registerHandler = () => setShowRegister(true);

  const closeHandler = (event) => {
    setShowLogin(false);
    setShowRegister(false);
  };

  function handleRegisterSubmit() {
    console.log("submit register");
  }

  return (
    <div className="navbar">
      <div className="sign-btns">
        <Button onClick={loginHandler} type="success" ghost>
          Login
        </Button>
        <Button
          onClick={registerHandler}
          type="success"
          className="register-btn"
        >
          Register
        </Button>

        {/* TODO: add Login component here */}
        <Register
          closeHandler={closeHandler}
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        />
      </div>
    </div>
  );
}
