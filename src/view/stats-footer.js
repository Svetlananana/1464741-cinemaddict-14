import Abstract from './abstract.js';

const createFooterStatisticsTemplate = (filmsCount) => {
  return `
  <p>${filmsCount === undefined ? 0 : filmsCount.length} movies inside</p>`;
};

export default class Statistics extends Abstract{

  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }
}
