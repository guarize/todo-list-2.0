import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import Header from './components/Header';
import backgroundDark from './images/bg-desktop-dark.jpg';
import backgroundLight from './images/bg-desktop-light.jpg';
import './App.css';
import { useContext, useEffect } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
  getCompletedFromLocalStorage,
  saveCompletedToLocalStorage,
} from './services';
import TodoContext from './contexts/TodoContext';

function App() {
  const { darkMode, setTodoList, setCompletedTasks } = useContext(TodoContext);

  useEffect(() => {
    const savedList = getFromLocalStorage();
    const savedCompletedTasks = getCompletedFromLocalStorage();
    if (!savedList) {
      saveToLocalStorage([]);
    } else {
      setTodoList(savedList);
    }

    if (!savedCompletedTasks) {
      saveCompletedToLocalStorage([]);
    } else {
      setCompletedTasks(savedCompletedTasks);
    }
  }, [setCompletedTasks, setTodoList]);

  return (
    <main className={darkMode ? 'app-container-dark' : 'app-container-light'}>
      {darkMode ? (
        <img
          src={backgroundDark}
          alt="background dark"
          className="background-img"
        />
      ) : (
        <img
          src={backgroundLight}
          alt="background light"
          className="background-img"
        />
      )}

      <div className="main-container">
        <div className="todo-wrapper">
          <Header />
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </main>
  );
}

export default App;
