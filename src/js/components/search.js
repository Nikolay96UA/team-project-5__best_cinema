// search
import { createMarkUp } from './gallery';
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

// Оголошення змінних
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const yearSelect = document.querySelector('.year-select');
const genreSelect = document.querySelector('.genre-select');
const countrySelect = document.querySelector('.country-select');
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
  // console.log('click');
  // console.log(event);
  // searchForm.classList.remove('form-single');
  yearSelect.classList.remove('input__is-hidden');
  genreSelect.classList.remove('input__is-hidden');
  countrySelect.classList.remove('input__is-hidden');
  searchForm.classList.remove('form-single');

  yearSelect.classList.add('input__is-shown');
  genreSelect.classList.add('input__is-shown');
  countrySelect.classList.add('input__is-shown');
  searchInput.setAttribute('placeholder', 'Film');
  searchInput.classList.add('for_mobile_width');
  searchForm.classList.add('mobile-form');

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
    if (objResultSearch.results.length === 0) {
      Notiflix.Notify.failure('Ooops, nothing to search.');
      return;
    }
    pagInstanceTrendWeek.reset(objResultSearch.total_results);
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
  const { data: resultSearch } = await axios.get(
    `${searchUrl}&page=${pagInstanceTrendWeek.getCurrentPage()}`
  );
  createMarkUp(resultSearch.results);
}
