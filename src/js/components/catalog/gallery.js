import { BASE_URL, API_KEY, URL_TREND_WEEK, URL_GENRE_LIST } from '../../constants/api';
import axios from 'axios';
import { searchWithQuery } from './search';
import { pagInstanceTrendWeek, paginContainerTrend } from './pagination';

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
      const array = [];
      ifWrongSearch(array);
      return;
    }
    totalPages = moviesObject.total_pages;
    return moviesObject.results;
  } catch (error) {
    console.log(error);
  }
}

export function createMarkUp(array) {
  const markup = array
    .map(({ title, genre_ids, release_date, poster_path, vote_average, id }) => {
      let urlPoster = `url('https://image.tmdb.org/t/p/w500${poster_path}')`;
      if (poster_path === null) {
        urlPoster = '';
      }
      return `<li class="gallery-item" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%), ${urlPoster}" data-id=${id}><div class="gallery-item__about"><h3 class="gallery-item__about__title">${title}</h3><p class="gallery-item__about__p">${getGenreForCard(
        genre_ids
      )} | ${release_date.slice(
        0,
        4
      )}</p></div><div class="rating"><input type="range" min="0" max ="10" class="input-rating" step=0.1 value="${vote_average.toFixed(
        1
      )}"><div class="rating-body"><div class="rating-active"></div><div class="rating-value">${vote_average.toFixed(
        1
      )}</div></div>
</div></li>`;
    })
    .join('');
  renderMarkup(markup);
}
function renderMarkup(markup) {
  galleryEl.innerHTML = markup;
  startStars();
}

export function ifWrongSearch(message) {
  console.log(message);
  const markup = message.map(el => `<p>${el}</p>`).join('');
  galleryEl.innerHTML = `<div class="mistake-in-search">${markup}</div>`;
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
  if (paginContainerTrend.dataset.status === 'pagin-trend') {
    const { page: pagPage } = event;
    currentPage = pagPage;
    const pagArray = await getTrendMoviesOfWeek();
    createMarkUp(pagArray);
  } else if (paginContainerTrend.dataset.status === 'pagin-search') {
    searchWithQuery();
  }
});

// here is rating with radio: <div class="rating-items"><input class="rating-item" type="radio" value="1" name="rating"><input class="rating-item" type="radio" value="2" name="rating"><input class="rating-item" type="radio" value="3" name="rating"><input class="rating-item" type="radio" value="4" name="rating"><input class="rating-item" type="radio" value="5" name="rating"></div>
{
  /* <div class="vote-cinemas ${stars(Number(vote_average.toFixed(1)))}"></div>
simple rating
<div class="div-votes"><div class="simple-rating__items"><input id="simple-rating__5" type="radio" value="5" class="simple-rating__item" name="simple-rating"><label for="simple-rating__5" class="simple-rating__label"></label><input id="simple-rating__4" type="radio" value="4" class="simple-rating__item" name="simple-rating"><label for="simple-rating__4" class="simple-rating__label"></label><input id="simple-rating__3" type="radio" value="3" class="simple-rating__item" name="simple-rating"><label for="simple-rating__3" class="simple-rating__label"></label><input id="simple-rating__2" type="radio" value="2" class="simple-rating__item" name="simple-rating"><label for="simple-rating__2" class="simple-rating__label"></label><input id="simple-rating__1" type="radio" value="1" class="simple-rating__item" name="simple-rating"><label for="simple-rating__1" class="simple-rating__label"></label></div></div> */
}
{
  /* <div
  class="vote-cinemas ${stars(
        Number(vote_average.toFixed(1))
      )}"
></div>; */
}

// JS for Stars

function startStars() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }
  // main function
  function initRatings() {
    let ratingActive, ratingValue;
    // running on all ratings on page
    for (let index = 0; index < [...ratings].length; index++) {
      const rating = ratings[index];

      initRating(rating);
    }
    // initialise rating
    function initRating(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
      if (rating.classList.contains('rating-set')) {
        setRating(rating);
      }
    }
    //set Rating
    // oportunity to set rating
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating-item');
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener('mouseenter', e => {
          // update vars
          initRatingVars(rating);
          // udpate active stars
          setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener('mouseleave', e => {
          setRatingActiveWidth();
        });
        ratingItem.addEventListener('click', e => {
          initRatingVars(rating);
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        });
      }
    }
    // initial vars
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating-active');
      ratingValue = rating.querySelector('.rating-value');
    }
    //change width of active stars
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05 / 2;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
  }
}
//<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
// {
/* <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg> */
// }
