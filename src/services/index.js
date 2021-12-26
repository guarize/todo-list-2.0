export const saveToLocalStorage = (todoList) => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

export const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('todoList'));
};

export const saveCompletedToLocalStorage = (completedTasks) => {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
};

export const getCompletedFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('completedTasks'));
};
