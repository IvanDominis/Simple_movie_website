export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const api_key = "6f7f8b9b571a52d5aac2a0c7391d1ed2";
export const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${api_key}&page=${page}`,
  getMovieDetail: (id) => `${tmdbEndpoint}/${id}?api_key=${api_key}`,
  getMovieMeta: (type, id) =>
    `${tmdbEndpoint}/${id}/${type}?api_key=${api_key}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${api_key}&query=${query}&page=${page}`,
  imageOriginal: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  image500: (path) => `https://image.tmdb.org/t/p/w500/${path}`,
};
