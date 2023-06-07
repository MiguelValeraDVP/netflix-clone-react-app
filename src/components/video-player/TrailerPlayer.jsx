import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_API_KEY } from "../../utils/generalConsts";
import backup_video from "../../assets/test_portfolio_canva_ex_1.mp4";
import "./trailerPlayer.css";

const TrailerPlayer = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [videoUrl, setVideoUrl] = useState("");

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
          setVideoUrl(backup_video);
          throw new Error("No trailers found for the movie.");
        }
      } catch (error) {
        setVideoUrl(backup_video);
      }
    }

    fetchTrailer();
  }, []);

  return (
    <div className="player-container">
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <iframe
          title="movie trailer"
          src={videoUrl}
          allowFullScreen
          autoPlay
          muted
        />
      </div>
    </div>
  );
};

export default TrailerPlayer;
