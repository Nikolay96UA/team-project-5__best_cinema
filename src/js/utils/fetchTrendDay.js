import axios from 'axios';
import { API_KEY, BASE_URL, URL_TREND_DAY } from '../constants/api';
import { renderOnError } from '../components/hero';

// Function to fetch trending movies from TMDB API
export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(
      `${BASE_URL}${URL_TREND_DAY}?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    renderOnError();
  }
}
