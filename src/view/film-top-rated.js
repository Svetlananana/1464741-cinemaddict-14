import { createElement } from '../utils/render.js';

const createTopRatedTemplate = () => {
  return` <section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container" id="top-rated-list">
  </div>
</section>`;
};

export default class FilmTopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedTemplate();
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
