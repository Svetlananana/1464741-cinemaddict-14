import Abstract from './abstract.js';

const createProfileUserTemlate = (rating) => {
  if (rating === 0) {
    return;
  }
  return `
  <section class="header__profile profile">
  <p class="profile__rating">${rating <= 10 ? 'Novice' : rating <= 20 ? 'Fan' : 'Movie Buff'}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class ProfileUser extends Abstract {
  constructor(rating) {
    super();
    this._rating = rating;
  }

  getTemplate() {
    return createProfileUserTemlate(this._rating);
  }
}
