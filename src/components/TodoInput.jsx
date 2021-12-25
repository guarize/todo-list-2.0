import React, { useContext } from 'react';
import TodoContext from '../contexts/TodoContext';
import { saveToLocalStorage } from '../services';
import '../styles/TodoInput.css';

export default function TodoInput() {
  const { newTodo, setNewTodo, todoList, setTodoList, darkMode } =
    useContext(TodoContext);

  const handleInputChange = ({ target: { value } }) => {
    setNewTodo(value);
  };

  const handleKeyDown = ({ key, type }) => {
    if (newTodo && (key === 'Enter' || type === 'click')) {
      saveToLocalStorage([...todoList, newTodo]);
      setTodoList([...todoList, newTodo]);
      setNewTodo('');
    }
  };

  return (
    <div
      className={
        darkMode ? 'input-wrapper input-dark' : 'input-wrapper input-light'
      }
    >
      <button type="button" className="todo-button" onClick={handleKeyDown} />
      <input
        type="text"
        placeholder="Create a new todo..."
        value={newTodo}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
