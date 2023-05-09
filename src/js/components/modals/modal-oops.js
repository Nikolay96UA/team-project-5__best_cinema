import { MovieDatabaseAPI } from '../../utils/fetchMovieDetails';

const openModalOopsBtn = document.querySelector('.open-modal');
const closeModalBtn = document.querySelector('[data-close-modal]');
const backdrop = document.querySelector('[data-backdrop]');
const modal = document.querySelector('.modal');
const container = document.querySelector('.wrap');

openModalOopsBtn.addEventListener('click', toggleModalOops);
closeModalBtn.addEventListener('click', toggleModalOops);

function toggleModalOops() {
  backdrop.classList.toggle('backdrop--hidden');
}
