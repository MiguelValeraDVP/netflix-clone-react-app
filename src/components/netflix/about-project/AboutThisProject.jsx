// About.js

import React, { useEffect, useRef, useState } from "react";
import "./about.css";
import logo from "../../../assets/logo.png";
import reactImage from "../../../assets/react.png";
import reduxImage from "../../../assets/redux.png";
import nodejsImage from "../../../assets/nodeJs.png";
import expressImage from "../../../assets/express.png";
import mongodbImage from "../../../assets/mongoDb.png";
import tmdbLogo from "../../../assets/tmdb.jpg";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const technologies = [
  {
    name: "React",
    image: reactImage,
    moreInfo:
      "The entire graphical user interface of the application was developed using React.",
  },
  {
    name: "Redux",
    image: reduxImage,
    moreInfo:
      "In Redux, we utilize a state management pattern to efficiently handle user data. When a user logs in, we store their relevant information in the application's state. This allows us to perform precise checks to determine if the user has any movies saved in their list. Additionally, we maintain a list of the movies they have saved and ensure their session remains active throughout their interaction with the application. By leveraging Redux, we effectively manage user data, facilitate movie list checks, and seamlessly maintain user sessions.",
  },
  {
    name: "Node.js",
    image: nodejsImage,
    moreInfo:
      "Node.js is a runtime environment that allows developers to execute JavaScript code outside of a web browser. NoseJs  Node.js enables server-side and network applications, offering a scalable and efficient platform for building web services.",
  },
  {
    name: "Express",
    image: expressImage,
    moreInfo:
      "Express is a minimalist web application framework for Node.js. It simplifies the process of building web servers and APIs by providing a robust set of features and utilities. It allows developers to handle routes, middleware, and HTTP requests efficiently, making web development in Node.js more streamlined.",
  },
  {
    name: "MongoDB",
    image: mongodbImage,
    moreInfo:
      "MongoDB is a NoSQL database system that stores data in a flexible, document-oriented format. It provides a scalable, high-performance solution for managing structured and unstructured data.",
  },
  {
    name: "The Movie Data Base",
    image: tmdbLogo,
    moreInfo:
      "TMDb provides an API that developers can utilize to access and integrate movie data into their applications or services, enabling features like search, recommendations, and movie-related information retrieval.",
  },
];

const About = () => {
  const [isTop, setIsTop] = useState(true);
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isTop && <Navbar />}
      <div ref={componentRef} className="about-container">
        <div className="about-title">
          <h2>
            About
            <span>
              <img src={logo} alt="Netflix" />
            </span>
            clon
          </h2>
        </div>
        <div className="about-mobile">
          <h2>About this project</h2>
        </div>
        <p>
          Hello world! This Netflix clone has been created by Miguel Valera in
          May 2023. First and foremost, I would like to express my gratitude to
          TMDB for providing the movie data. Without their contribution, this
          project would not have been possible. It is essential to clarify that
          this is solely a platform for me to enhance my development skills. It
          is not intended to replicate or infringe upon the original Netflix
          concept. Rather, my aim was to create an application that emulates the
          look and feel of Netflix. Furthermore, I would also like to extend my
          thanks to Netflix for serving as an exemplary reference during the
          styling process of this site. Additionally, I want to acknowledge
          YouTube for providing the video playback functionality. If you come
          across a movie card without a trailer in the database, it is due to
          the absence of an official trailer, and I have included an alternative
          video for preview purposes.
        </p>
        <h3>Technologies Used:</h3>
        <ul>
          {technologies.map((tech) => {
            return (
              <li key={tech.name} className="movie-card">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="movie-card__image"
                />
                <div className="movie-card__content">
                  <h4>{tech.name}</h4>
                  <p>{tech.moreInfo}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default About;
