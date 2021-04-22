import Abstract from './abstract.js';

const createTopRatedTemplate = () => {
  return `
  <section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container" id="top-rated-list">
  </div>
</section>`;
};

export default class FilmTopRated extends Abstract {

  getTemplate() {
    return createTopRatedTemplate();
  }
}
