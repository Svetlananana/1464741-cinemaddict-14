export const deleteItemById = (items, id) => {
  const index = items.findIndex((film) => film.id === id);

  if (index === -1) {
    throw new Error('Can\'t delete unexisting film');
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
};
