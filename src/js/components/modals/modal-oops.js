const openModalOopsBtn = document.querySelector('[data-modal-oops-open]');
const closeModaOopslBtn = document.querySelector('[data-modal-oops-close]');
const backdropOops = document.querySelector('[data-backdrop-oops]');
const modal = document.querySelector('.modal');
const container = document.querySelector('.wrap');

openModalOopsBtn.addEventListener('click', toggleModalOops);
closeModaOopslBtn.addEventListener('click', toggleModalOops);

function toggleModalOops() {
  backdropOops.classList.toggle('backdrop-oops--hidden');
}
