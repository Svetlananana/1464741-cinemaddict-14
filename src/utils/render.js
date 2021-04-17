export const BODY = document.querySelector('body');

export const InsertPlace = {
  BEFORE_END: 'beforeend',  //  сразу перед закрывающим тегом element (после последнего потомка)
  AFTER_BEGIN: 'afterbegin', // сразу после открывающего тега  element (перед первым потомком)
  BEFORE_BEGIN: 'beforebegin', // до самого element (до открывающего тега)
  AFTER_END: 'afterend', // после element (после закрывающего тега)
};

export const render = (container, element, place) => {
  switch (place) {
    case InsertPlace.AFTER_BEGIN:
      container.prepend(element);
      break;
    case InsertPlace.BEFORE_END:
      container.append(element);
      break;
  }
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template.trim(); // 2

  return newElement.firstChild; // 3
};
