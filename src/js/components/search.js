import { createMarkUp } from './gallery';
import { galleryEl } from './gallery';
import {
  API_KEY,
  BASE_URL,
  URL_GENRE_LIST,
  URL_COUNTRY_LIST,
  URL_SEARCH_MOVIE,
} from '../constants/api';
import Notiflix from 'notiflix';
import axios from 'axios';
import { pagInstanceTrendWeek } from './pagination';
import { paginContainerTrend } from './pagination';
import { Pagination } from 'tui-pagination';

// Оголошення змінних
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const yearSelect = document.querySelector('.year-select');
const genreSelect = document.querySelector('.genre-select');
const countrySelect = document.querySelector('.country-select');
const searchBtn = document.querySelector('.search-btn');
const resultBlock = document.querySelector('.search-movies');
let currentSearchPage = 1;
let searchUrl = '';

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
  searchForm.classList.remove('form-single');
  yearSelect.classList.remove('input__is-hidden');
  genreSelect.classList.remove('input__is-hidden');
  countrySelect.classList.remove('input__is-hidden');
  yearSelect.classList.add('input__is-shown');
  genreSelect.classList.add('input__is-shown');
  countrySelect.classList.add('input__is-shown');
  searchInput.setAttribute('placeholder', 'Film');

  searchMovies();
});

async function searchMovies() {
  try {
    const keyword = searchInput.value.trim();
    const year = yearSelect.value !== '' ? `&year=${yearSelect.value}` : '';
    const genre = genreSelect.value !== '' ? `&with_genres=${genreSelect.value}` : '';
    const country = countrySelect.value !== '' ? `&region=${countrySelect.value}` : '';
    let url = `${BASE_URL}${URL_SEARCH_MOVIE}?api_key=${API_KEY}&query=${keyword}`;
    if (genre) {
      url += `${genre}`;
    }
    if (country) {
      url += `${country}`;
    }
    if (year) {
      url += `${year}`;
    }
    searchUrl = url;
    const { data: objResultSearch } = await axios.get(url);
    console.log(objResultSearch);
    if (objResultSearch.results.length === 0) {
      Notiflix.Notify.failure('Ooops, nothing to search.');
      return;
    }
    pagInstanceTrendWeek.reset(objResultSearch.total_pages);
    paginContainerTrend.dataset.status = 'pagin-search';
    currentSearchPage = objResultSearch.page;
    createMarkUp(objResultSearch.results);
  } catch (error) {
    Notiflix.Notify.failure('Ooops, something go wrong, look at console for details.');
    console.log(error);
  }
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     createMarkUp(data.results); // виклик функції для передачі масиву об'єктів
  //   })
  //   .catch(error => {
  //     Notiflix.Notify.failure('Ooops, something go wrong, look at console for details.');
  //     console.error(error);
  //   });
}
// pagInstanceTrendWeek.on('beforeMove', async event => {
//   console.log('next search results');
//   const { page: pagPage } = event;
//   currentSearchPage = pagPage;
//   // const pagArray = await getTrendMoviesOfWeek();
//   // createMarkUp(pagArray);
// });
export async function searchWithQuery() {
  console.log(pagInstanceTrendWeek.getCurrentPage());
  console.log(currentSearchPage);
  const { data: resultSearch } = await axios.get(`${searchUrl}&page=${(currentSearchPage += 1)}`);
  console.log(resultSearch);
  createMarkUp(resultSearch.results);
  if (resultSearch.total_pages === currentSearchPage) {
  }
}
