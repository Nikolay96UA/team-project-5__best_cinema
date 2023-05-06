const offset = 100;
const scrollUp = document.querySelector('.scroll-to-top');

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
  if (getTop() > offset) {
    scrollUp.classList.add('scroll-to-top-activ');
  } else {
    scrollUp.classList.remove('scroll-to-top-activ');
  }
});

scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
