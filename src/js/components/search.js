import { createMarkUp } from "./gallery";

// Оголошення змінних
const searchInput = document.querySelector('.search-input');
const yearSelect = document.querySelector('.years-select');
const genreSelect = document.querySelector('.genre-select');
const countrySelect = document.querySelector('.country-select');
const searchBtn = document.getElementById("searchBtn");
const resultBlock = document.querySelector('.search-movies');

const apiKey = "e228a48ce493c266d1ac0e25cdb4d9c4";

function searchMovies() {
  const keyword = searchInput.value;
  const year = yearSelect.value ? `&year=${yearSelect.value}` : '';
  const genreValue = genreSelect.value;
  const genre = genreValue ? `&with_genres=${genreValue}` : '';
  const country = countrySelect.value ? `&region=${countrySelect.value}` : '';

  // Перевірка наявності хочаб одного вибраного критерію для пошуку
  if (!keyword && !year && !genre && !country) {
    resultBlock.innerHTML = "<p>Please enter at least one search criteria.</p>";
    return;
  }

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
  if (genre) {
    url += `&with_genres=${genre}`;
  }
  if (country) {
    url += `&region=${country}`;
  }
  if (year) {
    url += `&year=${year}`;
  }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      createMarkUp(data.results); // виклик функції для передачі масиву об'єктів
    })
    .catch(error => {
      resultBlock.innerHTML = "<p>Oops, something went wrong.</p>";
      console.error(error);
    });
}

searchBtn.addEventListener("click", event => {
  event.preventDefault();
  searchMovies();
});