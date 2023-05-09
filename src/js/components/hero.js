import { API_KEY, BASE_URL, IMG_URL } from '../constants/api';
import { ROOT_HERO_CONTAINER } from '../constants/root';
import { fetchTrendingMovies, getTrailer } from '../utils/fetchTrendDay';
// import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/swiper.min.css';
// import 'swiper/modules/navigation/navigation.min.css';
// import 'swiper/modules/pagination/pagination.min.css';

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
      : 'openModal()';

    return `
      <div class="hero__wrap swiper-slide">
        <div class="hero__bgd" style="background-image: url('${image}');"></div>
        <div class="hero__overlay"></div>
        <div class="hero__info">
          <div class="hero__details">
            <h2 class="hero__title">${
              title.length > 25 ? title.substring(0, 25) + '...' : title
            }</h2>
            <div class="hero__rating ${stars(Number(rating.toFixed(1)))}"></div>
            <p class="hero__overview">${
              overview.length > 300
                ? overview.substring(0, 300) + '...'
                : overview
            }</p>
            <button id="modal-trigger" type="button" class="hero__btn" onclick="${
              trailerLink
                ? `window.open('${trailerLink}', '_blank')`
                : 'openModal()'
            }">
              Watch trailer
            </button>
          </div>
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
      slidesPerView: 1,
      spaceBetween: 50,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' + className + '">' + 0 + (index + 1) + '</span>'
          );
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
      <div class="hero__wrap">
      <div class="hero__bgd hero__bgd-default"></div>
      <div class="hero__overlay"></div>
        <div class="hero__info">
          <div class="hero__details" >
            <h2 class="hero__title">Let's Make Your Own Cinema</h2>
            <p class="hero__overview">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
            <button class="hero__btn">
              <a href="./catalog.html" class="hero__btn-link">Get Started</a>
            </button>
          </div>
        </div>
    </div>
  `;
}

// Call renderTrendingMovies to initially render trending movies
renderTrendingMovies();

//! IDN doesn't work - openLinkInNewTab(url)
// function openLinkInNewTab(url) {
//   window.open(url, '_blank');
// }

// =========================================
// Винести код для модальних вікон в окремий файл
// =========================================
// // ! to open modal
// function openModal() {
//   const modal = document.getElementById('modal');
//   modal.style.display = 'block';
// }

// // Get the Modal Overlay and Modal Content elements
// const modalOverlay = document.getElementById('modal-overlay');
// const modal = document.getElementById('modal');

// // Get the Modal Trigger Button and Modal Close Button elements
// const modalTrigger = document.getElementById('modal-trigger');
// const modalClose = document.getElementById('modal-close');

// // Add a click event listener to the Modal Trigger Button
// modalTrigger.addEventListener('click', () => {
//   // Show the Modal Overlay
//   modalOverlay.style.display = 'block';
// });

// // Add a click event listener to the Modal Close Button
// modalClose.addEventListener('click', () => {
//   // Hide the Modal Overlay
//   modalOverlay.style.display = 'none';
// });

// // Add a click event listener to the Modal Overlay (to close the modal if clicked outside of it)
// modalOverlay.addEventListener('click', event => {
//   if (event.target === modalOverlay) {
//     // Hide the Modal Overlay
//     modalOverlay.style.display = 'none';
//   }
// });
