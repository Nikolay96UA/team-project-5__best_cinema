import { BASE_URL, API_KEY, URL_TREND_WEEK } from '../constants/api';
import axios from 'axios';

let currentPage = 1;
const galleryEl = document.getElementById('gallery');

getMoviesWeek();
async function getMoviesWeek() {
  const { data } = await axios.get(
    `${BASE_URL}${URL_TREND_WEEK}?api_key=${API_KEY}&page=${currentPage}&total_results=10000`
  );
  console.log(data);
  createMarkUp(data.results);
}

function createMarkUp(array) {
  const markup = array
    .map(({ title, genre_ids, release_date, poster_path }) => {
      return `<li class="gallery-item" style="background-image: url('https://image.tmdb.org/t/p/w500${poster_path}')"><div class="gallery-item__about"><h3 class="gallery-item__about__title>${title}</h3><p class="gallery-item__about__p">${genre_ids} | ${release_date}</p></li>`;
    })
    .join('');
  renderMarkup(markup);
}
function renderMarkup(markup) {
  galleryEl.innerHTML = markup;
}
