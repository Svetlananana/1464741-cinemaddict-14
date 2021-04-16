import { createElement } from '../utils/render.js';

const createProfileUserTemlate = (rating) => {
  if (rating === 0) {
    return;
  }
  return `<section class="header__profile profile">
  <p class="profile__rating">${rating <= 10 ? 'Novice' : rating <= 20 ? 'Fan' : 'Movie Buff'}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`.trim();
};

export default class ProfileUser {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createProfileUserTemlate();
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
