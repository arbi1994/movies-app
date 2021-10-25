// API KEY 
const API_KEY = process.env.REACT_APP_SECRET_KEY;
// BASE URL
const BASE_URL = "https://api.themoviedb.org/3";

// set ENDPOINTS
const GET = {
  discover: "/discover/movie", 
  latest: "/movie/latest", 
  popular: "/movie/popular", 
  now_playing: "/movie/now_playing", 
  upcoming: "/movie/upcoming", 
  genres: "/genre/movie/list",
  search: "/search/movie", 
  details: "/movie",
  configuration: "/configuration/countries"
}

const BASE_IMAGE_URL = "http://image.tmdb.org/t/p/"

const SECURE_BASE_IMAGE_URL = "https://image.tmdb.org/t/p/"

const POSTER_SIZES = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']

const BACKDROP_SIZES = ['w300', 'w780', 'w1280', 'original']

const LOGO_SIZES = ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original']

const PROFILE_SIZES = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']

const urlEndpoint  = 'https://ik.imagekit.io/iowcmbydcj3/' //URL for image optimization

export {
  API_KEY,
  BASE_URL,
  GET,
  BASE_IMAGE_URL,
  SECURE_BASE_IMAGE_URL,
  POSTER_SIZES,
  BACKDROP_SIZES,
  LOGO_SIZES,
  PROFILE_SIZES,
  urlEndpoint
}



