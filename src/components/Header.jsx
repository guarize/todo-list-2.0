import React, { useContext } from 'react';
import TodoContext from '../contexts/TodoContext';
import iconSun from '../images/icon-sun.svg';
import iconMoon from '../images/icon-moon.svg';
import '../styles/Header.css';

export default function Header() {
  const { darkMode, setDarkMode } = useContext(TodoContext);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="header-wrapper">
      <h1>TO DO</h1>
      {darkMode ? (
        <img src={iconSun} alt="icon sun" onClick={handleDarkMode} />
      ) : (
        <img src={iconMoon} alt="icon moon" onClick={handleDarkMode} />
      )}
    </div>
  );
}
