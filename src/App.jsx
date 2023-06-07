import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/netflix/Main";
import Login from "./components/auth/login/Login";
import "./index.css";
import Player from "./components/video-player/TrailerPlayer";
import MoviesSection from "./components/netflix/movies-section/MoviesSection";
import TvShows from "./components/netflix/movies-section/TvShows";
import MovieDescriptionPage from "./components/netflix/movies-section/MovieDescriptionPage";
import AboutThisProject from "./components/netflix/about-project/AboutThisProject";
import Contact from "./components/netflix/contact/Contact";
import UserMoviesList from "./components/netflix/movies-section/UserMoviesList";
import Asdf from "./components/auth/signup/Asdf";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Asdf />} />
        <Route exact path="/player/:movieId" element={<Player />} />
        <Route
          exact
          path="/movie-description/:movieId"
          element={<MovieDescriptionPage />}
        />
        <Route exact path="/movies" element={<MoviesSection />} />
        <Route exact path="/tv" element={<TvShows />} />
        <Route
          exact
          path="/about-this-project"
          element={<AboutThisProject />}
        />
        <Route exact path="/my-list" element={<UserMoviesList />} />

        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
