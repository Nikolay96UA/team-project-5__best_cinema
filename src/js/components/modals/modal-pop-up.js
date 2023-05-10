import { MovieDatabaseAPI } from '../../utils/fetchMovieDetails';
// import { onGalleryLinkClick } from '../components/gallery';
import { galleryEl } from '../gallery';

const closeModalBtn = document.querySelector('[data-close-modal]');
const backdrop = document.querySelector('[data-backdrop]');
const modal = document.querySelector('.modal');
const container = document.querySelector('.wrap');

const movieDatabaseAPI = new MovieDatabaseAPI();
let detailMarkup;

// form.addEventListener('submit', fetchDetailInfo);
// closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  backdrop.classList.toggle('backdrop--hidden');
}

async function fetchDetailInfo(movieId) {
  try {
    // e.preventDefault();
    // movieDatabaseAPI.query = e.currentTarget.elements.searchQuery.value;
    // console.log(movieDatabaseAPI.query);
    const result = await movieDatabaseAPI.fetchMovieDetails(movieId);
    // const secondResult = await fetchGenreDetails(result.genres.id);
    renderDetailMarkup(result);
    console.log(result);
    // const renderMarkup = renderDetailMarkup(result);
    // console.log(renderMarkup);
    toggleModal();

    const addToLibraryBtn = document.querySelector('.add-to-library');
    if (
      localStorage.getItem('library') &&
      JSON.parse(localStorage.getItem('library')).includes(result)
    ) {
      addToLibraryBtn.innerText = 'Delete from my library';
    }

    // Add or remove object from library
    addToLibraryBtn.addEventListener('click', () => {
      const library = localStorage.getItem('library')
        ? JSON.parse(localStorage.getItem('library'))
        : [];

      if (addToLibraryBtn.innerText === 'Add to my library') {
        library.push(result);
        localStorage.setItem('library', JSON.stringify(library));
        addToLibraryBtn.innerText = 'Delete from my library';
      } else {
        const index = library.findIndex(item => item.name === result.name);
        if (index !== -1) {
          library.splice(index, 1);
          localStorage.setItem('library', JSON.stringify(library));
          addToLibraryBtn.innerText = 'Add to my library';
        }
      }
    });
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
        ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="tizer">`
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
          <p class='feature-value'>${vote_average}<span> / </span>${vote_count}</p>
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
    <button class="close-modal" type="button" data-close-modal>
      <svg width="24px" height="24px">
        <use
          class="close-modal__icon-close"
          href="./images/icons/symbol-defs.svg#close-button"
        ></use>
      </svg>
    </button>
    `;
  container.innerHTML = detailMarkup;
}

galleryEl.addEventListener('click', onGalleryLinkClick);

function onGalleryLinkClick(event) {
  if (event.target.nodeName === 'LI') {
    const movieId = event.target.dataset.id;
    fetchDetailInfo(movieId);
  }
}

export { fetchDetailInfo };
