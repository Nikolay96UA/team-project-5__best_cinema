import { BASE_URL, API_KEY, URL_TREND_WEEK, URL_GENRE_LIST } from '../constants/api';
import axios from 'axios';
import { searchWithQuery } from './search';
import { pagInstanceTrendWeek, paginContainerTrend, paginTrend } from './pagination';

// Pagination
import Notiflix, { Notify } from 'notiflix';
import Pagination from 'tui-pagination';
export { pagInstanceTrendWeek };
export const paginContainerTrend = document.getElementById('tui-pagination-container');
// Pagination
// const paginContainerTrend = document.getElementById('tui-pagination-container');
console.log(paginContainerTrend);
// paginContainerTrend.dataset.status = paginContainerTrend === null ? '' : 'pagin-trend';
try {
  paginContainerTrend.dataset.status = paginContainerTrend === null ? '' : 'pagin-trend';
  const paginTrend = paginContainerTrend.dataset.status;
} catch (error) {
  Notiflix.Notify.failure('Something wrong with pagination :-(');
  console.log(error);
}
// console.log(paginTrend);
const pagOptions = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',

  template: {
    page: '<a href="#" class="tui-page-btn page">{{page}}</a>',
    currentPage: '<span class="tui-page-btn tui-is-selected curr-page">{{ page }}</span>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}"><svg xmlns="http://www.w3.org/2000/svg" class="arrow-svg-{{type}}" width="28" height="28" fill="none"><path stroke="#B7B7B7" style="stroke: var(--active-svg-color, var(--color-subtitle-card))" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.938 6.125 10.063 14l7.874 7.875"/></svg></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"><svg xmlns="http://www.w3.org/2000/svg" class="arrow-svg-{{type}}" width="28" height="28" fill="none"><path stroke="#B7B7B7" style="stroke: var(--color-subtitle-card, var(--active-svg-color))" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.938 6.125 10.063 14l7.874 7.875"/></svg></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
    allPages:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip total-pages">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagInstanceTrendWeek = new Pagination(paginContainerTrend, pagOptions);

// end pagination
// style = 'stroke: var(--active-svg-color, var(--secondary-text-color))';
// style = 'stroke: var(--active-svg-color, var(--secondary-text-color))';

// end Pagination
let currentPage = 1;
let totalPages = 0;
let genresListArray = [];
let idsArray = [];
let categorysArray = [];
export const galleryEl = document.getElementById('gallery');

onPageShow();

async function onPageShow() {
  try {
    const arrayTrandMovies = await getTrendMoviesOfWeek();
    const { data: genresObject } = await axios.get(
      `${BASE_URL}${URL_GENRE_LIST}?api_key=${API_KEY}`
    );
    genresListArray = genresObject.genres;
    for (let i = 0; i < genresListArray.length; i += 1) {
      idsArray.push(genresListArray[i].id);
      categorysArray.push(genresListArray[i].name);
    }
    createMarkUp(arrayTrandMovies);
  } catch (error) {
    console.log(error);
  }
}

export async function getTrendMoviesOfWeek() {
  try {
    const { data: moviesObject } = await axios.get(
      `${BASE_URL}${URL_TREND_WEEK}?api_key=${API_KEY}&page=${currentPage}`
    );
    if (moviesObject.results.length === 0) {
      return ['Ssory, we can not find something :-('];
    }
    console.log(moviesObject);
    totalPages = moviesObject.total_pages;
    return moviesObject.results;
  } catch (error) {
    console.log(error);
  }
}

export function createMarkUp(array) {
  const markup = array
    .map(({ title, genre_ids, release_date, poster_path, vote_average, id }) => {
      // console.log(poster_path);
      let urlPoster = `url('https://image.tmdb.org/t/p/w500${poster_path}')`;
      if (poster_path === null) {
        urlPoster = '';
      }
      // const image = `.\/img\/395x574-no-image.jpg`;
      // const poster = poster_path === null ? `${image}` : poster_path;
      // console.log('poster:', poster);
      // if (poster_path === null) {
      //   urlPoster = poster;
      //   console.log('замінив');
      // }

      return `<li class="gallery-item" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%), ${urlPoster}" data-id=${id}><div class="gallery-item__about"><h3 class="gallery-item__about__title">${title}</h3><p class="gallery-item__about__p">${getGenreForCard(
        genre_ids
      )} | ${release_date.slice(0, 4)}</p></div><div class="vote-cinemas ${stars(
        Number(vote_average.toFixed(1))
      )}"></div></li>`;
    })
    .join('');
  renderMarkup(markup);
}
function renderMarkup(markup) {
  galleryEl.innerHTML = markup;
}

function getGenreForCard(genreIds) {
  const genreArr = [];
  for (let i = 0; i <= genreIds.length; i += 1) {
    if (idsArray.includes(genreIds[i])) {
      const indx = idsArray.indexOf(genreIds[i]);
      genreArr.push(categorysArray[indx]);
    }
  }
  while (genreArr.length > 2) {
    genreArr.pop();
  }
  return genreArr.join(', ');
}

function stars(vote) {
  if (vote === 10) {
    return 'ten-stars';
  } else if (vote < 10 && vote > 8) {
    return 'nine-stars';
  } else if (vote === 8) {
    return 'eight-stars';
  } else if (vote < 8 && vote > 6) {
    return 'seven-stars';
  } else if (vote === 6) {
    return 'six-stars';
  } else if (vote < 6 && vote > 4) {
    return 'five-stars';
  } else if (vote === 4) {
    return 'four-stars';
  } else if (vote < 4 && vote > 2) {
    return 'three-stars';
  } else if (vote === 2) {
    return 'two-stars';
  } else if (vote < 2 && vote > 0) {
    return 'one-star';
  } else if (vote === 0) {
    return 'zero-star';
  } else if (!vote) {
    return 'No rating';
  }
}

pagInstanceTrendWeek.on('afterMove', async event => {
  if (paginTrend === 'pagin-trend') {
    const { page: pagPage } = event;
    currentPage = pagPage;
    const pagArray = await getTrendMoviesOfWeek();
    createMarkUp(pagArray);
  } else if (paginTrend === 'pagin-search') {
    searchWithQuery();
  }
});

export function onGalleryLinkClick(event) {
  if (event.target.nodeName === 'LI') {
    const movieId = event.target.dataset.id;
    return movieId;
  }
}
