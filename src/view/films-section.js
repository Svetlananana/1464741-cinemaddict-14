import Abstract from './abstract.js';

const createFilmSectionTemplate = () => {
  return `
  <section class="films">
    </section>`;
};

export default class FilmBlock extends Abstract {

  getTemplate() {
    return createFilmSectionTemplate();
  }
}
