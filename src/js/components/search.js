import { createMarkUp } from './gallery';
import { galleryEl } from './gallery';

// Оголошення змінних
const searchInput = document.querySelector('.searchInput');
const yearSelect = document.querySelector('.yearSelect');
const genreSelect = document.querySelector('.genreSelect');
const countrySelect = document.querySelector('.countrySelect');
const searchBtn = document.getElementById('searchBtn');
const resultBlock = document.querySelector('.search-movies');

const apiKey = 'e228a48ce493c266d1ac0e25cdb4d9c4';

function searchMovies() {
  const keyword = searchInput.value;
  const year = yearSelect.value !== '' ? `&year=${yearSelect.value}` : '';
  const genre = genreSelect.value !== '' ? `&with_genres=${genreSelect.value}` : '';
  const country = countrySelect.value !== '' ? `&region=${countrySelect.value}` : '';
  // Перевірка наявності хочаб одного вибраного критерію для пошуку
  if (!keyword && !year && !genre && !country) {
    galleryEl.innerHTML =
      '<p>Please enter at least one search criteria. The name of film is required!</p>';
    return;
  }
  if (!keyword) {
    galleryEl.innerHTML = `<p>The name of fim is required!</p>`;
    return;
  }

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
  if (genre) {
    url += `${genre}`;
  }
  if (country) {
    url += `${country}`;
  }
  if (year) {
    url += `${year}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      createMarkUp(data.results); // виклик функції для передачі масиву об'єктів
    })
    .catch(error => {
      resultBlock.innerHTML = '<p>Oops, something went wrong.</p>';
      console.error(error);
    });
}

searchBtn.addEventListener('click', event => {
  event.preventDefault();
  searchMovies();
});
