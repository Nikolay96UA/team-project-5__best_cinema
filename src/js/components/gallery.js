import { BASE_URL, API_KEY, URL_TREND_WEEK, URL_GENRE_LIST } from '../constants/api';
import axios from 'axios';
import { pagInstance } from './pagination';

let currentPage = 1;
let genresListArray = [];
let idsArray = [];
let categorysArray = [];
const galleryEl = document.getElementById('gallery');

getMoviesWeekAndGenreList();
async function getMoviesWeekAndGenreList() {
  try {
    const { data: moviesObject } = await axios.get(
      `${BASE_URL}${URL_TREND_WEEK}?api_key=${API_KEY}&page=${currentPage}`
    );

    // console.log('tenPaginationArr', tenPaginationArr);
    // console.log('twentyPaginationArr', twentyPaginationArr);
    const { data: genresObject } = await axios.get(
      `${BASE_URL}${URL_GENRE_LIST}?api_key=${API_KEY}`
    );
    console.log('result object', moviesObject);
    genresListArray = genresObject.genres;
    for (let i = 0; i < genresListArray.length; i += 1) {
      idsArray.push(genresListArray[i].id);
      categorysArray.push(genresListArray[i].name);
    }
    // console.log('idsArray', idsArray);
    // console.log('categorysArray', categorysArray);
    // console.log('genresListArray', genresListArray);
    createMarkUp(moviesObject.results);
  } catch (error) {
    console.log(error);
  }
}

function createMarkUp(array) {
  const markup = array
    .map(({ title, genre_ids, release_date, poster_path, vote_average }) => {
      return `<li class="gallery-item" style="background-image: url(https://image.tmdb.org/t/p/w500${poster_path})"><div class="gallery-item__about"><h3 class="gallery-item__about__title">${title}</h3><p class="gallery-item__about__p">${getGenreForCard(
        genre_ids
      )} | ${release_date.slice(
        0,
        4
      )}</p></div><input class="input-vote" type="range" name="vote" min="0" max="10.0" step="0.1" value=${vote_average.toFixed(
        1
      )}></li>`;
    })
    .join('');
  renderMarkup(markup);
}
function renderMarkup(markup) {
  galleryEl.innerHTML = markup;
}

function getGenreForCard(genreIds) {
  // console.log('genreListArray', genresListArray);
  // console.log('data[0].name', genresListArray[0].name);
  // console.log('genreId', genreId);
  const genreArr = [];
  for (let i = 0; i <= genreIds.length; i += 1) {
    if (idsArray.includes(genreIds[i])) {
      const indx = idsArray.indexOf(genreIds[i]);
      genreArr.push(categorysArray[indx]);
    }
  }
  while (genreArr.length > 2) {
    genreArr.pop();
    // console.log('length is more than 2');
  }
  return genreArr.join(', ');
}
// <div class="for-img"></div>
// style="background-image: url(https://image.tmdb.org/t/p/w500${poster_path})"

pagInstance.on('beforeMove', event => {
  const { page: pagPage } = event;
  console.log(pagPage);
  if (pagPage === 2) {
    pagInstance.movePageTo(3);
    console.log(pagPage);
  }
});
// pagInstance.on('afterMove', ({ page: pagPage }) => console.log(pagPage));
