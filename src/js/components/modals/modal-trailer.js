import { getTrailer, getMovieTrailer } from '../../utils/fetchTrendDay';

const heroEl = document.querySelector('.hero');
const youTubePlayerEl = document.querySelector('.iframe-trailer');
const trailerBackdropEl = document.querySelector('.trailer-modal__backdrop');
const trailerCloseBtnEl = document.querySelector(
  '.trailer-modal__button-colse'
);
const trailerContainerEl = document.querySelector('.trailer-container');
const noMovieContainerEl = document.querySelector('.no-movie-container');

heroEl.addEventListener('click', onTrailerBtnClick);

async function onTrailerBtnClick(e) {
  const trailerBtn = e.target;
  if (trailerBtn.classList.contains('hero__btn')) {
    // console.log('you click here');

    showTrailerModal();

    trailerContainerEl.classList.remove('trailer-is-hidden');
    noMovieContainerEl.classList.add('trailer-is-hidden');

    const movieId = trailerBtn.dataset.id;
    renderTrailer(movieId);
  }
}

function showTrailerModal() {
  document.body.classList.add('show-trailer-modal');
  window.addEventListener('keydown', onEscPress);
  trailerBackdropEl.addEventListener('click', onBackdropClick);
  trailerCloseBtnEl.addEventListener('click', closeModal);
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  const backdrop = e.target;
  if (backdrop.classList.contains('trailer-modal__backdrop')) {
    closeModal();
  }
}

function closeModal() {
  document.body.classList.remove('show-trailer-modal');
  youTubePlayerEl.src = '';
  window.removeEventListener('keydown', onEscPress);
  trailerBackdropEl.removeEventListener('click', onBackdropClick);
  trailerCloseBtnEl.removeEventListener('click', closeModal);

  trailerContainerEl.classList.add('trailer-is-hidden');
  noMovieContainerEl.classList.remove('trailer-is-hidden');
}

async function renderTrailer(movieId) {
  let movieTrailerKey = await getRandomTrailerKey(movieId);

  youTubePlayerEl.src = `https://www.youtube.com/embed/${movieTrailerKey}`;
}

async function getRandomTrailerKey(movieId) {
  const movieTrailers = await getMovieTrailer(movieId);

  const min = 0;
  const max = movieTrailers.results.length;
  const randomTrailer = Math.floor(Math.random() * (max - min + 1)) + min;

  const movieTrailerKey = movieTrailers.results[randomTrailer]?.key;

  if (!movieTrailerKey) {
    trailerContainerEl.classList.add('trailer-is-hidden');
    noMovieContainerEl.classList.remove('trailer-is-hidden');
    return;
  }

  return movieTrailerKey;
}
