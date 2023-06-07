import React from "react";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../../../index.css";
import "./header.css";

const NavbarLoginSignup = (props) => {
  const navigate = useNavigate();
  return (
    <header className="container flex a-center j-between">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <button
        className="login-button"
        onClick={() => navigate(props.login ? "/login" : "/signup")}
      >
        {props.login ? "Log in" : "Sign in"}
      </button>
    </header>
  );
};

export default NavbarLoginSignup;
