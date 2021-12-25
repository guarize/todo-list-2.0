export const saveToLocalStorage = (todoList) => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

export const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('todoList'));
};
