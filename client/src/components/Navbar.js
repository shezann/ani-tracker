import React from "react";
import { Button } from "@geist-ui/react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="sign-btns">
        <Link to="/login">
          <Button type="success" ghost>
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button type="success" className="register-btn">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
