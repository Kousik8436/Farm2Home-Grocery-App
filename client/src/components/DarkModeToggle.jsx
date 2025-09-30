import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
        isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;