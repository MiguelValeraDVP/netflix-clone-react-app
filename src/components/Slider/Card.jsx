import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import axios from "axios";
import { Modal } from "@mui/material";
import backup_video from "../../assets/test_portfolio_canva_ex_1.mp4";
import {
  TMBD_BASE_URL,
  TMDB_API_KEY,
  movieAdded,
  movieDisliked,
  movieLiked,
} from "../../utils/generalConsts";
import { BsCardChecklist, BsFillTrash3Fill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import "../../index.css";
import "./slider-styles/card.css";
import { useSelector } from "react-redux";

const Card = ({ movieData, onSVGClick, showTrash }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.netflix.user);
  const [openModal, setOpenModal] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await axios.get(
          `${TMBD_BASE_URL}/movie/${movieData.id}/videos?api_key=${TMDB_API_KEY}`
        );

        if (response.data.results.length > 0) {
          const trailerKey = response.data.results[0].key;
          const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
          setVideoUrl(trailerUrl);
        } else {
          const tvResponse = await axios.get(
            `${TMBD_BASE_URL}/tv/${movieData.id}/videos?api_key=${TMDB_API_KEY}`
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
  }, [movieData.id]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addMovieToList = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const mail = user.email;
      await axios.post(
        "https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/add-movie-to-list",
        {
          mail,
          data: movieData,
        }
      );
      movieAdded();
    } catch (error) {
      throw new Error(error);
    }
  };

  const addToLikeList = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const mail = user.email;

      await axios.post(
        "https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/like-movie",
        {
          mail,
          data: movieData,
        }
      );
      movieLiked();
    } catch (error) {
      throw new Error(error);
    }
  };

  const addToDislikeList = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const mail = user.email;
      await axios.post(
        "https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/dislike-movie",
        {
          mail,
          data: movieData,
        }
      );
      movieDisliked();
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteMovieFromList = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const mail = user.email;
      await axios.post(
        "https://netfliix-clone-backend-i87z8ckkj-miguelvaleradvp.vercel.app/api/user/remove-movie-from-list",
        {
          mail,
          data: movieData,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div
        className="card-slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenModal}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="movie poster"
        />
        {isHovered && (
          <div className="hover">
            <div className="image-video-container">
              {videoUrl ? (
                <iframe
                  title="movie trailer"
                  className="video"
                  src={videoUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video src={backup_video} autoPlay muted className="video" />
              )}
            </div>
            <div className="info-container flex column">
              <h3
                className="name"
                onClick={() => navigate(`/player/${movieData.id}`)}
              >
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="play"
                    onClick={() => navigate(`/player/${movieData.id}`)}
                  />
                  <RiThumbUpFill
                    title="like"
                    onClick={() => {
                      addToLikeList();
                      onSVGClick();
                    }}
                  />

                  <RiThumbDownFill
                    title="Dislike"
                    onClick={() => {
                      addToDislikeList();
                      onSVGClick();
                    }}
                  />

                  {showTrash ? (
                    <BsFillTrash3Fill
                      title="Remove From List"
                      onClick={() => {
                        deleteMovieFromList();
                        onSVGClick();
                      }}
                    />
                  ) : (
                    <BsCardChecklist
                      title="Add To Watch Later List"
                      onClick={() => {
                        addMovieToList();
                        onSVGClick();
                      }}
                    />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown
                    title="More Info"
                    onClick={() =>
                      navigate(`/movie-description/${movieData.id}`)
                    }
                  />
                </div>
              </div>
              {movieData.genres && movieData.genres.length > 0 && (
                <div className="genres flex">
                  <ul className="flex">
                    {movieData.genres.map((genre) => (
                      <li key={genre}> {genre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          <div className="hover">
            <div className="image-video-container">
              {videoUrl ? (
                <iframe
                  title="movie trailer"
                  className="video"
                  src={videoUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video src={backup_video} autoPlay muted className="video" />
              )}
            </div>
            <div className="info-container flex column">
              <h3
                className="name"
                onClick={() => navigate(`/player/${movieData.id}`)}
              >
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="play"
                    onClick={() => navigate(`/player/${movieData.id}`)}
                  />
                  <RiThumbUpFill
                    title="like"
                    onClick={() => {
                      addToLikeList();
                      onSVGClick();
                    }}
                  />

                  <RiThumbDownFill
                    title="Dislike"
                    onClick={() => {
                      addToDislikeList();
                      onSVGClick();
                    }}
                  />

                  {showTrash ? (
                    <BsFillTrash3Fill
                      title="Remove From List"
                      onClick={() => {
                        deleteMovieFromList();
                        onSVGClick();
                      }}
                    />
                  ) : (
                    <BsCardChecklist
                      title="Add To Watch Later List"
                      onClick={() => {
                        addMovieToList();
                        onSVGClick();
                      }}
                    />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown
                    title="More Info"
                    onClick={() =>
                      navigate(`/movie-description/${movieData.id}`)
                    }
                  />
                </div>
              </div>
              {movieData.genres && movieData.genres.length > 0 && (
                <div className="genres flex">
                  <ul className="flex">
                    {movieData.genres.map((genre) => (
                      <li key={genre}> {genre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
