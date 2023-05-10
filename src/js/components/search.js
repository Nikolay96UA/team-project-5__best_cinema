import { createMarkUp } from './gallery';
import { galleryEl } from './gallery';
import { API_KEY, BASE_URL, URL_GENRE_LIST, URL_COUNTRY_LIST } from '../constants/api';
import Notiflix from 'notiflix';
import axios from 'axios';

// Оголошення змінних
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const yearSelect = document.querySelector('.year-select');
const genreSelect = document.querySelector('.genre-select');
const countrySelect = document.querySelector('.country-select');
const searchBtn = document.querySelector('.search-btn');
const resultBlock = document.querySelector('.search-movies');

generateGenreList();
generateCountryList();
async function generateGenreList() {
  try {
    const { data: genreObj } = await axios.get(`${BASE_URL}${URL_GENRE_LIST}?api_key=${API_KEY}`);
    createGenreListMarkup(genreObj.genres);
  } catch (error) {
    Notiflix.Notify.failure(
      'Something wrong with generate Genres list. Look in console for details.'
    );
    console.log(error);
  }
}
async function generateCountryList() {
  try {
    const { data: countryArr } = await axios.get(
      `${BASE_URL}${URL_COUNTRY_LIST}?api_key=${API_KEY}`
    );
    createCountryListMarkup(countryArr);
  } catch (error) {
    Notiflix.Notify.failure(
      'Something wrong with generate Country list. Look in console for details.'
    );
    console.log(error);
  }
}

function createGenreListMarkup(array) {
  let markup = array
    .map(el => {
      return `<option value="${el.id}">${el.name}</option>`;
    })
    .join('');
  markup = '<option value="">Genre</option>' + markup;
  genreSelect.innerHTML = markup;
}
function createCountryListMarkup(array) {
  let markup = array
    .map(el => {
      return `<option value="${el.iso_3166_1}">${el.english_name}</option>`;
    })
    .join('');
  markup = '<option value="">Country</option>' + markup;
  countrySelect.innerHTML = markup;
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log('click');
  console.log(event);
  // if (event.target.nodeName === 'BUTTON' || event.target.nodeName === 'svg') {
  searchForm.classList.remove('form-single');
  yearSelect.classList.remove('input__is-hidden');
  genreSelect.classList.remove('input__is-hidden');
  countrySelect.classList.remove('input__is-hidden');
  yearSelect.classList.add('input__is-shown');
  genreSelect.classList.add('input__is-shown');
  countrySelect.classList.add('input__is-shown');
  searchInput.setAttribute('placeholder', 'Film');
  // }
  searchMovies();
});

function searchMovies() {
  const keyword = searchInput.value;
  const year = yearSelect.value !== '' ? `&year=${yearSelect.value}` : '';
  const genre = genreSelect.value !== '' ? `&with_genres=${genreSelect.value}` : '';
  const country = countrySelect.value !== '' ? `&region=${countrySelect.value}` : '';
  // Перевірка наявності хочаб одного вибраного критерію для пошуку
  // if (!keyword && !year && !genre && !country) {
  //   // galleryEl.innerHTML =
  //   //   '<p>Please enter at least one search criteria. The name of film is required!</p>';
  //   Notiflix.Notify.failure(
  //     'Please enter at least one search criteria. The name of film is required!'
  //   );
  //   return;
  // }
  // if (!keyword) {
  //   // galleryEl.innerHTML = `<p>The name of fim is required!</p>`;
  //   Notiflix.Notify.failure('The name of fim is required!');
  //   return;
  // }

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`;
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
      Notiflix.Notify.failure('Ooops, something go wrong, look at console for details.');
      console.error(error);
    });
}
