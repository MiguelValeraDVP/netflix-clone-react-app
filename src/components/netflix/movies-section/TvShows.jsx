import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../../store";

import Navbar from "../navbar/Navbar";
import Slider from "../../Slider/Slider";
import NotAvailable from "../not-available-view/NotAvailable";
import SelectMovieGenre from "./SelectMovieGenre";
import "./movies-section.css";
import Footer from "../footer/Footer";

const TvShows = () => {
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const movies = useSelector((state) => state.netflix.movies);

  const genres = useSelector((state) => state.netflix.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="movie-section-container">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectMovieGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
      <Footer />
    </div>
  );
};

export default TvShows;
