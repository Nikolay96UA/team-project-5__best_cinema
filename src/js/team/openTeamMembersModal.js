import { teamInfo } from './teamInfo';
import { renderTeamCard } from './renderTeamCards';

function handleFooterBtnClick(e) {
    e.prevenDefault();
    openModal();
    refs.body.addEventListener('keydown', onKeyPress);
    refs.backdropRef.addEventListener('click', closeBackdropClick);

    refs.body.classList.add('modal-is-open');
    refs.backdropRef.classList.remove('is-hidden');
    refs.body.classList.add('content-hidden');
}
    const swiperMarkup = renderSwiper();
    refs.backdropRef.innerHTML = '';
    refs.backdropRef.insertAdjacentHTML('beforeend', swiperMarkup);
    const swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPreView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    });

    const footerBtn = document.querySelector('.footer-btn');
    footerBtn.addEventListener('click', handleFooterBtnClick);

function renderSwiper() {
    const memberCards = shuffle(teamInfo.map(member => renderTeamCard(member))).join('');
    const markup = `<div class="swiper">
    <div class="swiper-wrapper">
        ${memberCards}
    </div>
    <div class="swiper-pagination"></div>
    </div>`;
    return markup;
}

    export function closeModal() {
    refs.body.removeEventListener('keydown', onKeyPress);
    refs.body.classList.remove('modal-is-open');
    refs.backdropRef.removeEventListener('click', closeBackdropClick);

    refs.backdropRef.classList.add('is-hidden');
    refs.backdropRef.innerHTML = '';
    refs.body.classList.remove('content-hidden');
}

const onKeyPress = event => {
    if (event.code === 'Escape') closeMembersModal();
  };
    function closeBackdropClick(e) {
       const classList = e.target.classList;

         if (classList.contains('backdrop') || classList.contains('swiper')) {
            closeMembersModal();
    }else{
        return;
    }
}
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}