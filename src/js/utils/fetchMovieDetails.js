import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants/api';
// import { renderOnError } from '../components/hero';
import { onGalleryLinkClick } from '../components/gallery';

class MovieDatabaseAPI{
  constructor() {
  }

  // Function to fetch detail info from TMDB API
async fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    // renderOnError();
  }
}
}

export {MovieDatabaseAPI};