import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SearchSuggestions = ({ query, onSelect }) => {
  const { products } = useContext(AppContext);
  
  if (!query) return null;
  
  const suggestions = products
    .filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      {suggestions.map((product) => (
        <div
          key={product._id}
          onClick={() => onSelect(product)}
          className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0"
        >
          <img 
            src={`http://localhost:5000/images/${product.image[0]}`} 
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className="font-medium text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="ml-auto text-orange-600 font-bold">
            ₹{product.offerPrice}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;