import React, { useState, useEffect } from "react";
import "./main.css";
import Navbar from "./navbar/Navbar";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import movieLogo from "../../assets/header-title.webp";
import backgroundImage from "../../assets/header-picture.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";
import Slider from "../Slider/Slider";
import { HelloToast, WelcomeToast } from "../../utils/generalConsts";
import { ToastContainer } from "react-toastify";
import Footer from "./footer/Footer";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    HelloToast();
    setTimeout(() => {
      WelcomeToast();
    }, 5000);
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [dispatch, genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const bannerMovieId = 66732;

  return (
    <main>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="Movie logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate(`/player/${bannerMovieId}`)}
            >
              <FaPlay /> Play
            </button>
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate(`/movie-description/${bannerMovieId}`)}
            >
              <AiOutlineInfoCircle />
              More info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default Main;
