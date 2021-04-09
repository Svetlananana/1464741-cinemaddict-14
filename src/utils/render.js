export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const InsertPlace = {
  BEFORE_END: 'beforeend',  //  сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};
