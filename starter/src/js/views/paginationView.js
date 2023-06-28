import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(curPage + 1, 'next', 'right');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(curPage - 1, 'prev', 'left');
    }
    // Other pages
    if (curPage < numPages) {
      return `
      ${this._generateMarkupBtn(curPage - 1, 'prev', 'left')}
      ${this._generateMarkupBtn(curPage + 1, 'next', 'right')}`;
    }
    // Page1, and there are no other pages
    return '';
  }
  _generateMarkupBtn(page, btn, arrow) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--${btn}">
    <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
    </button>`;
  }
}

export default new PaginationView();
