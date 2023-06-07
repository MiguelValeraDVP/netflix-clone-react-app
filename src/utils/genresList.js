const getMoviesFromRange = (movies, from, to) => {
  return movies.slice(from, to);
};

export const slidersContent = [
  {
    title: "Trending Now",
    data: `${getMoviesFromRange(0, 10)}`,
  },
];
