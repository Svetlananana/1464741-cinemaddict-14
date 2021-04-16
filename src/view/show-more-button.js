import { createElement } from '../utils/render.js';

const createShowMoreButtonTemlate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemlate();
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
