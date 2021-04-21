import Abstract from './abstract.js';

const createMostCommentedTemplate = () => {
  return `
  <section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container" id="most-commented-list">
  </div>

</section>`;
};

export default class FilmMostCommented  extends Abstract {

  getTemplate() {
    return createMostCommentedTemplate();
  }
}

