import * as basicLightbox from 'basiclightbox';
import SimpleLightbox from 'simplelightbox';
import Pagination from 'tui-pagination';

document.addEventListener('DOMContentLoaded', () => {
  const errorContainer = document.querySelector('.library__error-message');
  const buttonContainer = document.querySelector('.container-button');
  const movieListContainer = document.querySelector('.movie-list');

  const storedMovies = localStorage.getItem('library');
  const movies = storedMovies ? JSON.parse(storedMovies) : [];

  if (movies.length > 0) {
    errorContainer.remove();
    buttonContainer.remove();
    renderMovies(movies);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-line');
    errorMessage.innerHTML = `
      OOPS...<br />
      We are very sorry!<br />
      You don’t have any movies at your library.
    `;
    errorContainer.appendChild(errorMessage);
  }

  function renderMovies(movies) {
    movieListContainer.innerHTML = '';

    movies.forEach((movie, index) => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = renderDetailMarkup(movie);
      movieListContainer.appendChild(movieElement);

      if ((index + 1) % 3 === 0) {
        movieElement.classList.add('last-in-row');
      }
    });
  }

  function renderDetailMarkup({
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  }) {
    const posterImage = poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster">`
      : '';
    const genreNames = genres.map(genre => genre.name).join(' ');

    return `
      <div class='container-image-wrap'>
        ${posterImage}
      </div>
      <div class='container-content-wrap'>
        <h3 class='title'>${original_title}</h3>
        <div class='content-wrap'>
          <div class='features-wrap'>
            <p class='feature-name'>Vote / Votes</p>
            <p class='feature-name'>Popularity</p>
            <p class='feature-name'>Genre</p>
          </div>
          <div class='features-values-wrap'>
            <p class='feature-value'>${vote_average}<span> / </span>${vote_count}</p>
            <p class='feature-value'>${popularity}</p>
            <p class='feature-value'>${genreNames}</p>
          </div>
        </div>
        <p class='feature-name feature-name-uppercase'>About</p>
        <p class='feature-value feature-value-description'>${overview}</p>
        <button class="add-to-library" type="button">Add to my library</button>
      </div>
    `;
  }
});
