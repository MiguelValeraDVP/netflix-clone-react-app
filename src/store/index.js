import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { TMBD_BASE_URL, TMDB_API_KEY } from "../utils/generalConsts";

const storedUser = localStorage.getItem("user");

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const getGenres = createAsyncThunk("netflix/genres/", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMBD_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
  );
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
    if (moviesArray.length >= 60) {
      break;
    }
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${TMBD_BASE_URL}/trending/${type}/week?api_key=${TMDB_API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchByGenre = createAsyncThunk(
  "netflix/moviesByGenre",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${TMBD_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const { setUser, logoutUser } = NetflixSlice.actions;

export const Store = configureStore({
  reducer: { netflix: NetflixSlice.reducer },
});
