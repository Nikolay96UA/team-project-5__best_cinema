import { MovieDatabaseAPI } from '../../utils/fetchMovieDetails';
// import { weekTrendsEl } from '../trends';
// import { movieListContainer } from '../../libraries';

// const libraryEl = document.querySelector('.library-cards');

const body = document.querySelector('body');
const closeModalBtn = document.querySelector('[data-close-modal]');
const backdrop = document.querySelector('[data-backdrop]');
const modalPopUp = document.querySelector('.modal');
const container = document.querySelector('.wrap');
const galleryEl = document.querySelector('.gallery');
// const weekTrendsEl = document.getElementById('trends-list');
const movieListContainer = document.querySelector('.movie');

const movieDatabaseAPI = new MovieDatabaseAPI();
let detailMarkup;

// form.addEventListener('submit', fetchDetailInfo);
closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeByBackdrop);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

function closeByBackdrop(e) {
  const currentEl = e.target;
  if (currentEl !== backdrop) {
    return;
  } else {
    closeModal();
  }
}

function openModal() {
  backdrop.classList.remove('backdrop--hidden');
  body.classList.add('modal-open');
  // closeModalBtn.removeEventListener('click', closeModal);
  // backdrop.removeEventListener('click', closeByBackdrop);
}

closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeByBackdrop);

function closeModal() {
  backdrop.classList.add('backdrop--hidden');
  body.classList.remove('modal-open');
  // galleryEl.removeEventListener('click', onGalleryLinkClick);
}

async function fetchDetailInfo(movieId) {
  try {
    const result = await movieDatabaseAPI.fetchMovieDetails(movieId);
    renderDetailMarkup(result);

    const addToLibraryBtn = document.querySelector('.add-to-library');

    const library = localStorage.getItem('library');
    const localStorageData = library ? JSON.parse(library) : [];

    for (let i = 0; i < localStorageData.length; i++) {
      const id = localStorageData[i].id;
      if (id === result.id) {
        addToLibraryBtn.innerText = 'Delete from my library';
      }
    }

    addToLibraryBtn.addEventListener('click', () => {
      if (addToLibraryBtn.innerText === 'Add to my library') {
        localStorageData.push(result);
        localStorage.setItem('library', JSON.stringify(localStorageData));
        addToLibraryBtn.innerText = 'Delete from my library';
      } else {
        const index = localStorageData.findIndex(item => item.id === result.id);
        if (index !== -1) {
          localStorageData.splice(index, 1);
          localStorage.setItem('library', JSON.stringify(localStorageData));
          addToLibraryBtn.innerText = 'Add to my library';
        }
      }
    });

    openModal();
  } catch (error) {
    console.dir(error);
  }
}

function renderDetailMarkup({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  detailMarkup = `
    <div class='container-image-wrap'>${
      poster_path
        ? `<img src="https://image.tmdb.org/t/p/w342/${poster_path}" alt="tizer">`
        : ''
    }</div>
    <div class='container-content-wrap'>
      <h3 class='title'>${original_title}</h3>
      <div class='content-wrap'>
        <div class='features-wrap'>
          <p class='feature-name'>Vote / Votes</p>
          <p class='feature-name'>Popularity</p>
          <p class='feature-name'>Genre</p>
        </div>
        <div class='features-values-wrap'>
          <p class='feature-value'><span class="vote-numbers">${vote_average}</span><span class="slash"> / </span><span class="vote-numbers">${vote_count}</span></p>
          <p class='feature-value'>${popularity}</p>
          <p class='feature-value'>${Object.values(genres)
            .map(genre => genre.name)
            .join(' ')}</p>
        </div>
      </div>
      <p class='feature-name feature-name-uppercase'>About</p>
      <p class='feature-value feature-value-description'>${overview}</p>
      <button class="add-to-library" type="button">Add to my library</button>
    </div>
    `;
  container.innerHTML = detailMarkup;
}

// galleryEl.addEventListener('click', onGalleryLinkClick);
// libraryEl.addEventListener('click', onGalleryLinkClick);

function onGalleryLinkClick(event) {
  if (event.target.nodeName === 'LI') {
    const movieId = event.target.dataset.id;
    // console.log('Это LI!!!');
    fetchDetailInfo(movieId);
  }
}
