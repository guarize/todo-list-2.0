import React, { useState } from 'react';
import TodoContext from '../contexts/TodoContext';

export default function TodoProvider({ children }) {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const contextValue = {
    todoList,
    setTodoList,
    newTodo,
    setNewTodo,
    darkMode,
    setDarkMode,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
