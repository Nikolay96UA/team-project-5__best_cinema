import Pagination from 'tui-pagination';
const paginContainer = document.getElementById('tui-pagination-container');
const title = 'myTitle';
const pagOptions = {
  totalItems: 240,
  itemsPerPage: 10,
  visiblePages: 3,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',

  template: {
    page: '<a href="#" class="tui-page-btn page">{{page}}</a>',
    currentPage: '<span class="tui-page-btn tui-is-selected curr-page">{{ page }}</span>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
    allPages:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip total-pages">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagInstance = new Pagination(paginContainer, pagOptions);

export { pagInstance };
