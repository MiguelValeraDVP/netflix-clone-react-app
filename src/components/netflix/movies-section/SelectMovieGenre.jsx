import React from "react";
import { fetchByGenre } from "../../../store";
import { useDispatch } from "react-redux";
import "./select-movie-genre.css";

const SelectMovieGenre = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <select
      className="flex "
      onChange={(e) => {
        dispatch(fetchByGenre({ genre: e.target.value, type }));
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectMovieGenre;
