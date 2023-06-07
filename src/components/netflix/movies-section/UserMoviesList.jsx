import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./user-movies-list.css";
import "../../../index.css";

import Navbar from "../navbar/Navbar";
import axios from "axios";
import Card from "../../Slider/Card";
import { useNavigate } from "react-router-dom";

const UserMoviesList = () => {
  const navigate = useNavigate();

  const [isSVGClicked, setIsSVGClicked] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const user = useSelector((state) => state.netflix.user);

  const [moviesList, setMoviesList] = useState([]);

  const [likedMoviesList, setLikedMoviesList] = useState([]);

  const [dislikedMoviesList, setDislikedMoviesList] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    getListMovies();
    getLikedMovies();
    getDislikedMovies();
    isMovieOnList();
  }, [isSVGClicked]);

  const getListMovies = async () => {
    try {
      if (user) {
        const mail = user.email;
        const response = await axios.get(
          `https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/user-movie-list?mail=${mail}`
        );
        const movies = response.data.movies;
        setMoviesList(movies);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getLikedMovies = async () => {
    try {
      if (user) {
        const mail = user.email;
        const response = await axios.get(
          `https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/user-liked-movies-list?mail=${mail}`
        );
        const likedMovies = response.data.movies;
        setLikedMoviesList(likedMovies);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getDislikedMovies = async () => {
    try {
      if (user) {
        const mail = user.email;
        const response = await axios.get(
          `https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/user-disliked-movies-list?mail=${mail}`
        );
        const dislikedMovies = response.data.movies;
        setDislikedMoviesList(dislikedMovies);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const isMovieOnList = (movieId) => {
    moviesList.map((movie) => movie.id);
    return moviesList.includes(movieId);
  };

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <div className="user-movies-list-container">
        <div className="user-movies-list-flex j-center">
          <h1>
            <a href="#my-list" className="user-movies-list-links">
              My list
            </a>
          </h1>
          <h1>
            <a href="#liked-list" className="user-movies-list-links">
              Liked List
            </a>
          </h1>
          <h1>
            <a href="#disliked-list" className="user-movies-list-links">
              Disliked List
            </a>
          </h1>
        </div>
        <div className="user-movies-list-content flex column">
          <h1 id="my-list">My list</h1>
          <div className="grid flex">
            {moviesList.length > 0 ? (
              moviesList.map((movie, index) => {
                return (
                  <Card
                    key={index}
                    movieData={movie}
                    onSVGClick={() => setIsSVGClicked(!isSVGClicked)}
                    showTrash={true}
                  />
                );
              })
            ) : (
              <p>Your list is empty.</p>
            )}
          </div>
          <h1 id="liked-list">Liked Movies</h1>
          <div className="flex grid">
            {likedMoviesList.length > 0 ? (
              likedMoviesList.map((movie, index) => {
                return (
                  <Card
                    key={index}
                    movieData={movie}
                    onSVGClick={() => setIsSVGClicked(!isSVGClicked)}
                  />
                );
              })
            ) : (
              <p>Your liked list is empty.</p>
            )}
          </div>
          <h1 id="disliked-list">Disliked Movies</h1>
          <div className="flex grid">
            {dislikedMoviesList.length > 0 ? (
              dislikedMoviesList.map((movie, index) => {
                return (
                  <Card
                    key={index}
                    movieData={movie}
                    onSVGClick={() => setIsSVGClicked(!isSVGClicked)}
                  />
                );
              })
            ) : (
              <p>Your disliked list is empty.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMoviesList;
