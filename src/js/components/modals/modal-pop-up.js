import { MovieDatabaseAPI } from '../../utils/fetchMovieDetails';
// import { onGalleryLinkClick } from '../components/gallery';
import { galleryEl } from '../gallery';
import {weekTrendsEl} from '../trends';

const closeModalBtn = document.querySelector('[data-close-modal]');
const backdrop = document.querySelector('[data-backdrop]');
const modal = document.querySelector('.modal');
const container = document.querySelector('.wrap');


const movieDatabaseAPI = new MovieDatabaseAPI();
let detailMarkup;

// form.addEventListener('submit', fetchDetailInfo);
closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeByBackdrop);
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

function closeByBackdrop(e){
  const currentEl = e.target;
  console.log('You click on:', currentEl);
  if(currentEl !== backdrop){
    return;
  } else{
    closeModal(currentEl);
  }
}

function openModal() {
  backdrop.classList.remove('backdrop--hidden');
  // closeModalBtn.removeEventListener('click', closeModal);
  // backdrop.removeEventListener('click', closeByBackdrop);
  
}

function closeModal() {
  backdrop.classList.add('backdrop--hidden');
  // galleryEl.removeEventListener('click', onGalleryLinkClick);
}


 

async function fetchDetailInfo(movieId) {
  try {
    const result = await movieDatabaseAPI.fetchMovieDetails(movieId);
    console.log('1');
    renderDetailMarkup(result);
    console.log('2');
    console.log(result.id);

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
    console.log('3');
    
    console.log(result);

    openModal();

    console.log('4');

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

galleryEl.addEventListener('click', onGalleryLinkClick);
weekTrendsEl.addEventListener('click', onGalleryLinkClick);

function onGalleryLinkClick(event) {
  if (event.target.nodeName === 'LI') {
    const movieId = event.target.dataset.id;
    console.log('Это LI!!!')
    fetchDetailInfo(movieId);
  }
}

 export { fetchDetailInfo };
