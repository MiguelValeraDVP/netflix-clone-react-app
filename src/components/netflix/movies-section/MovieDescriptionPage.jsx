import React, { useEffect, useState } from "react";
import "./movie-full-description.css";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import backup_video from "../../../assets/test_portfolio_canva_ex_1.mp4";
import { TMDB_API_KEY } from "../../../utils/generalConsts";
import { BsArrowLeft } from "react-icons/bs";

const MovieDescriptionPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [data, setData] = useState([]);
  console.log(movieId);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
        );

        if (response.data.results.length > 0) {
          const trailerKey = response.data.results[0].key;
          const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
          setVideoUrl(trailerUrl);
        } else {
          const tvResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${TMDB_API_KEY}`
          );

          if (tvResponse.data.results.length > 0) {
            const trailerKey = tvResponse.data.results[0].key;
            const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
            setVideoUrl(trailerUrl);
          } else {
            setVideoUrl(backup_video);
            throw new Error("No trailers found for the movie or TV show.");
          }
        }
      } catch (error) {
        setVideoUrl(backup_video);
      }
    }

    fetchTrailer();
  }, [movieId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      setData(response.data);
      setMovie(response.data);
    } catch (error) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        setData(response.data);
        setMovie(response.data);
      } catch (error) {
        throw new Error({ message: error });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-container">
      <div className="description-video-container">
        <div className="player">
          <div className="back">
            <BsArrowLeft onClick={() => navigate(-1)} />
          </div>
          {videoUrl ? (
            <iframe
              title="movie trailer"
              src={videoUrl}
              allowFullScreen
              autoPlay
              muted
              className="video"
            />
          ) : (
            <video src={backup_video} autoPlay muted className="video" />
          )}
        </div>
      </div>
      <div className="movie-description">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{data.original_title}</h1>
          <p className="movie-details">
            <span className="detail-label">Description: </span>
            {data.overview}
          </p>
          <div className="flex" style={{ marginTop: "1rem" }}>
            <p className="movie-details">
              <span className="detail-label">Language:</span>{" "}
              {data.original_language}
            </p>
            <p className="movie-details">
              <span className="detail-label">Release Date:</span>
              {data.release_date}
            </p>
            <p className="movie-details">
              <span className="detail-label">Duration:</span> {data.runtime}min
            </p>
          </div>
          <div className="flex">
            <p className="movie-details">
              <span className="detail-label">Genre(s):</span>
              {data.genres?.map((genre, index) => {
                return <span key={index}>{genre.name} - </span>;
              })}
            </p>
            <p className="movie-details">
              <span className="detail-label">
                Rating: {movie.vote_average} /10
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescriptionPage;
