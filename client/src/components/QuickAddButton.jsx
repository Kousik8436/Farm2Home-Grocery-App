import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const QuickAddButton = ({ productId, className = "" }) => {
  const { addToCart, user, setShowUserLogin } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowUserLogin(true);
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      addToCart(productId);
      setIsAdding(false);
    }, 300);
  };

  return (
    <button
      onClick={handleQuickAdd}
      disabled={isAdding}
      className={`group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isAdding ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Adding...
          </>
        ) : (
          <>
            🛒 Quick Add
          </>
        )}
      </span>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
};

export default QuickAddButton;