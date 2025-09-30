import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const HeartButton = ({ productId, className = "" }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, user, setShowUserLogin } = useContext(AppContext);
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowUserLogin(true);
      return;
    }

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
        isInWishlist(productId) 
          ? 'bg-red-100 text-red-500 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
      } ${className}`}
    >
      {isInWishlist(productId) ? '❤️' : '🤍'}
    </button>
  );
};

export default HeartButton;