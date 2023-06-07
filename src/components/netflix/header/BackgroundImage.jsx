import React from "react";
import "./header.css";
import loginBackgroundImage from "../../../assets/login-background.jpg";

const BackgroundImage = () => {
  return (
    <div className="login-bg-image">
      <img src={loginBackgroundImage} alt="Background" />
    </div>
  );
};

export default BackgroundImage;
