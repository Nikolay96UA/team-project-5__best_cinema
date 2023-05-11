import { API_KEY, BASE_URL, IMG_URL } from '../constants/api';
import { ROOT_HERO_CONTAINER } from '../constants/root';
import { fetchTrendingMovies, getTrailer } from '../utils/fetchTrendDay';
import Swiper, { Navigation, Pagination } from 'swiper';

// Function to create markup for a single movie
async function createMovieCardMarkup(movie) {
  const image = movie.backdrop_path
    ? `${IMG_URL}${movie.backdrop_path}`
    : `${IMG_URL}${movie.poster_path}`;
  const title = movie.title || movie.name || 'Untitled';
  const overview = movie.overview || 'No description available.';
  const rating = movie.vote_average || 'No rating';
  const id = movie.id;

  try {
    const trailer = await getTrailer(id);
    const trailerLink = trailer
      ? `https://www.youtube.com/watch?v=${trailer}`
      : null;

    return `
      <div class="swiper-slide hero__card">
        <img class="hero__img" src="${image}" alt="${title}" width="802" height="720" loading="lazy" />
        <div class="hero__details">
          <h2 class="hero__title">
            ${title.length > 25 ? title.substring(0, 25) + '...' : title}
          </h2>
          <div class="hero__rating ${stars(Number(rating.toFixed(1)))}"></div>
          <p class="hero__overview">
            ${
              overview.length > 300
                ? overview.substring(0, 300) + '...'
                : overview
            }
          </p>
          <button
            class="hero__btn"
            id="modal-trigger"
            type="button"
             data-id="${id}"
          >
            Watch trailer
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    defaultHeroMarkup();
  }
}

// to render Rating in stars
function stars(vote) {
  if (vote === 10) {
    return 'ten-stars1';
  } else if (vote < 10 && vote > 8) {
    return 'nine-stars1';
  } else if (vote === 8) {
    return 'eight-stars1';
  } else if (vote < 8 && vote > 6) {
    return 'seven-stars1';
  } else if (vote === 6) {
    return 'six-stars1';
  } else if (vote < 6 && vote > 4) {
    return 'five-stars1';
  } else if (vote === 4) {
    return 'four-stars1';
  } else if (vote < 4 && vote > 2) {
    return 'three-stars1';
  } else if (vote === 2) {
    return 'two-stars1';
  } else if (vote < 2 && vote > 0) {
    return 'one-star1';
  } else if (vote === 0) {
    return 'zero-star1';
  } else if (!vote) {
    return 'No rating';
  }
}

// Function to render trending movies to the DOM
async function renderTrendingMovies() {
  const swiperWrap = document.querySelector('.swiper-wrapper');
  let markup = '';

  try {
    const trendingMovies = await fetchTrendingMovies();

    if (trendingMovies.length === 0) {
      defaultHeroMarkup();
    }

    for (let i = 0; i < trendingMovies.length; i++) {
      const movieCardMarkup = await createMovieCardMarkup(trendingMovies[i]);
      markup += movieCardMarkup;
    }

    swiperWrap.innerHTML = markup;

    // create SWIPER with options
    const swiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 50,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      // autoplay: {
      //   delay: 5000,
      //   stopOnLastSlide: false,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },
    });
  } catch (error) {
    console.error(error);
    defaultHeroMarkup();
  }
}

export function defaultHeroMarkup() {
  ROOT_HERO_CONTAINER.innerHTML = `
      <div class="hero__card hero__card-error">
      <div class="hero__img-error"></div>
          <div class="hero__details hero__details-error">
            <h2 class="hero__title hero__title-error">Let's Make Your Own Cinema</h2>
            <p class="hero__overview">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
            <a href="./catalog.html">
            <button class="hero__btn" type="button">
            Get Started
          </button>
          </a>
          </div>
        </div>
    </div>
  `;
}

// Call renderTrendingMovies to initially render trending movies
renderTrendingMovies();
