import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants/api';
import { renderOnError } from '../components/hero';

class MovieDatabaseAPI{
  constructor() {
    this.searchQuery = '';
  }

  // Function to fetch detail info from TMDB API
async fetchMovieDetails() {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${this.searchQuery}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    renderOnError();
  }
}

get query() {
  return this.searchQuery;
}

set query(newQuery) {
  this.searchQuery = newQuery;
}
}

export {MovieDatabaseAPI};