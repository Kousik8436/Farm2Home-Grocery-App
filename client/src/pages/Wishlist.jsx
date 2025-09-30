import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import QuickAddButton from '../components/QuickAddButton';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, products } = useContext(AppContext);
  
  const wishlistProducts = products.filter(product => wishlist.includes(product._id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="mt-12 pb-16 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-600 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500">Add products you love to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="mt-12 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        ❤️ My Wishlist ({wishlistProducts.length})
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <div className="relative">
              <img 
                src={`http://localhost:5000/images/${product.image[0]}`}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                ❤️
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 capitalize">{product.category}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">₹{product.offerPrice}</span>
                  {product.price > product.offerPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                  )}
                </div>
              </div>
              
              <QuickAddButton productId={product._id} className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;