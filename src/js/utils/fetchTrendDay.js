import axios from 'axios';
import { API_KEY, BASE_URL, URL_TREND_DAY } from '../constants/api';
import { defaultHeroMarkup } from '../components/hero';

// Function to fetch trending movies from TMDB API
export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(
      `${BASE_URL}${URL_TREND_DAY}?api_key=${API_KEY}`
    );

    const trendingMovies = response.data.results.slice(0, 5);

    return trendingMovies;
  } catch (error) {
    console.error(error);
    defaultHeroMarkup();
  }
}

// Function to fetch movie trailer
export async function getTrailer(movie_id) {
  try {
    const response = await axios.get(
      `${BASE_URL}movie/${movie_id}/videos?api_key=${API_KEY}`
    );

    const movieTrailer = await response.data.results[0].key;

    return movieTrailer;
  } catch (error) {
    console.error(error);
    defaultHeroMarkup();
  }
}

export async function getMovieTrailer(movie_id) {
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
  const params = {
    api_key: API_KEY,
  };

  const response = await axios.get(BASE_URL, { params });

  const movieTrailer = await response.data;

  return movieTrailer;
}
