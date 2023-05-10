import * as basicLightbox from 'basiclightbox';
import SimpleLightbox from 'simplelightbox';
import Pagination from 'tui-pagination';

// const movieList = document.querySelector('.movie-list');

// const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];

// function renderMovies() {
//   if (savedMovies.length > 0) {
//     const moviesHTML = savedMovies.map(movie => `<div>${movie}</div>`).join('');
//     movieList.innerHTML = moviesHTML;
//   } else {
//     movieList.innerHTML = '<div class="no-movie">No movies</div>';
//   }
// }

// renderMovies();

// const addMovieForm = document.querySelector('#add-movie-form');
// addMovieForm.addEventListener('submit', event => {
//   event.preventDefault();

//   const newMovie = addMovieForm.elements.movie.value.trim();
//   if (newMovie !== '') {
//     savedMovies.push(newMovie);
//     localStorage.setItem('movies', JSON.stringify(savedMovies));
//     renderMovies();
//     addMovieForm.elements.movie.value = '';
//   }
// });

// movieList.addEventListener('click', event => {
//   const clickedElement = event.target;
//   if (clickedElement.tagName === 'DIV') {
//     const movieText = clickedElement.textContent;
//     savedMovies = savedMovies.filter(movie => movie !== movieText);
//     localStorage.setItem('movies', JSON.stringify(savedMovies));
//     renderMovies();
//   }
// });
document.addEventListener('DOMContentLoaded', function () {
  var moviesContainer = document.getElementById('movies');
  var movies = JSON.parse(localStorage.getItem('movies'));

  if (movies && movies.length > 0) {
    // Якщо фільми знайдені в локальному сховищі, відображаємо їх
    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i];
      var movieElement = document.createElement('div');
      movieElement.textContent = movie.title;
      moviesContainer.appendChild(movieElement);
    }
  } else {
    // Якщо фільми не знайдені, відображаємо стандартний текст та кнопку
    var oopsText = document.createElement('p');
    oopsText.textContent =
      'OOPS... We are very sorry! You don’t have any movies at your library.';
    moviesContainer.appendChild(oopsText);
  }
});
