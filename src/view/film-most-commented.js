import { createElement } from '../utils/render.js';

const createMostCommentedTemplate = () => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container" id="most-commented-list">
  </div>

</section>`.trim();
};

export default class FilmMostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

