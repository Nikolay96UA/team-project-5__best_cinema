// import Notiflix, { Notify } from 'notiflix';
// import Pagination from 'tui-pagination';
// export { pagInstanceTrendWeek };
// export const paginContainerTrend = document.getElementById('tui-pagination-container');
// // Pagination
// // const paginContainerTrend = document.getElementById('tui-pagination-container');
// console.log(paginContainerTrend);
// // paginContainerTrend.dataset.status = paginContainerTrend === null ? '' : 'pagin-trend';
// try {
//   paginContainerTrend.dataset.status = paginContainerTrend === null ? '' : 'pagin-trend';
//   const paginTrend = paginContainerTrend.dataset.status;
// } catch (error) {
//   Notiflix.Notify.failure('Something wrong with pagination :-(');
//   console.log(error);
// }
// // console.log(paginTrend);
// const pagOptions = {
//   totalItems: 1000,
//   itemsPerPage: 20,
//   visiblePages: 5,
//   page: 1,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',

//   template: {
//     page: '<a href="#" class="tui-page-btn page">{{page}}</a>',
//     currentPage: '<span class="tui-page-btn tui-is-selected curr-page">{{ page }}</span>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
//       '<span class="tui-ico-{{type}}"><svg xmlns="http://www.w3.org/2000/svg" class="arrow-svg-{{type}}" width="28" height="28" fill="none"><path stroke="#B7B7B7" style="stroke: var(--active-svg-color, var(--color-subtitle-card))" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.938 6.125 10.063 14l7.874 7.875"/></svg></span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}"><svg xmlns="http://www.w3.org/2000/svg" class="arrow-svg-{{type}}" width="28" height="28" fill="none"><path stroke="#B7B7B7" style="stroke: var(--color-subtitle-card, var(--active-svg-color))" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.938 6.125 10.063 14l7.874 7.875"/></svg></span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//     allPages:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip total-pages">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };
// const pagInstanceTrendWeek = new Pagination(paginContainerTrend, pagOptions);

// // end pagination
// // style = 'stroke: var(--active-svg-color, var(--secondary-text-color))';
// // style = 'stroke: var(--active-svg-color, var(--secondary-text-color))';
