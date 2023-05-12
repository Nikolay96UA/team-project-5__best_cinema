import {
  BASE_URL,
  API_KEY,
  URL_TREND_WEEK,
  URL_GENRE_LIST,
} from '../constants/api';
import axios from 'axios';

export const weekTrendsEl = document.getElementById('trends-list');

let currentPage = 1;
let idsArray = [];
let categorysArray = [];

onPageShow();
async function onPageShow() {
  try {
    const arrayTrandMovies = await getTrendMoviesOfWeek();
    const { data: genresObject } = await axios.get(
      `${BASE_URL}${URL_GENRE_LIST}?api_key=${API_KEY}`
    );

    const allUncomingArr = arrayTrandMovies.slice(0, 3);

    const genresListArray = genresObject.genres;
    for (let i = 0; i < genresListArray.length; i += 1) {
      idsArray.push(genresListArray[i].id);
      categorysArray.push(genresListArray[i].name);
    }
    createMarkUp(allUncomingArr);
  } catch (error) {
    console.log(error);
  }
}

async function getTrendMoviesOfWeek() {
  try {
    const { data: moviesObject } = await axios.get(
      `${BASE_URL}${URL_TREND_WEEK}?api_key=${API_KEY}&page=${currentPage}`
    );
    return moviesObject.results;
  } catch (error) {
    console.log(error);
  }
}

function createMarkUp(array) {
  const markup = array
    .map(
      ({ title, genre_ids, release_date, poster_path, vote_average, id }) => {
        return `
        <li class="trends-card" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%), url(https://image.tmdb.org/t/p/w500${poster_path})" data-id=${id}>
          <div class="trends-card-about">
            <h3 class="trends-card-subtitle">${title}</h3>
            <p class="trends-card-meta">
              ${getGenreForCard(genre_ids)} | ${release_date.slice(0, 4)}
            </p>
          </div>
          <div class="vote-cinemas ${stars(Number(vote_average.toFixed(1)))}">
          </div>
        </li>`;
      }
    )
    .join('');
  renderMarkup(markup);
}
function renderMarkup(markup) {
  weekTrendsEl.innerHTML = markup;
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
