import * as basicLightbox from 'basiclightbox';
import SimpleLightbox from 'simplelightbox';
import Pagination from 'tui-pagination';

const movieList = document.querySelector('.movie-list');

const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  if (savedMovies.length > 0) {
    const moviesHTML = savedMovies.map(movie => `<div>${movie}</div>`).join('');
    movieList.innerHTML = moviesHTML;
  } else {
    movieList.innerHTML = '<div class="no-movie">No movies</div>';
  }
}

renderMovies();

const addMovieForm = document.querySelector('#add-movie-form');
addMovieForm.addEventListener('submit', event => {
  event.preventDefault();

  const newMovie = addMovieForm.elements.movie.value.trim();
  if (newMovie !== '') {
    savedMovies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(savedMovies));
    renderMovies();
    addMovieForm.elements.movie.value = '';
  }
});

movieList.addEventListener('click', event => {
  const clickedElement = event.target;
  if (clickedElement.tagName === 'DIV') {
    const movieText = clickedElement.textContent;
    savedMovies = savedMovies.filter(movie => movie !== movieText);
    localStorage.setItem('movies', JSON.stringify(savedMovies));
    renderMovies();
  }
});
