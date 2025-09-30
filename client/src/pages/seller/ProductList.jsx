import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { axios } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleStock = async (id, inStock) => {
    try {
      // Update UI immediately for better UX
      setProducts(prev => prev.map(product => 
        product._id === id ? { ...product, inStock } : product
      ));
      
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        toast.success(data.message);
        fetchProducts(); // Refresh the product list
      } else {
        toast.error(data.message);
        // Revert on error
        setProducts(prev => prev.map(product => 
          product._id === id ? { ...product, inStock: !inStock } : product
        ));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating stock");
      // Revert on error
      setProducts(prev => prev.map(product => 
        product._id === id ? { ...product, inStock: !inStock } : product
      ));
    }
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  📋 Product Inventory
                </h1>
                <p className="text-green-100 mt-2">Manage your product catalog and stock levels</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="text-white font-semibold">{products.length} Products</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-8">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Add your first product to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={product.image && product.image[0] ? `http://localhost:5000/images/${product.image[0]}` : `https://picsum.photos/300/200?random=${product._id}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">{product.name}</h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">₹{product.offerPrice}</span>
                          {product.price > product.offerPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                          )}
                        </div>
                        {product.price > product.offerPrice && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                            {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                          </span>
                        )}
                      </div>

                      {/* Stock Toggle */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm font-medium text-gray-700">Stock Status</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            onChange={() => toggleStock(product._id, !product.inStock)}
                            checked={product.inStock}
                            type="checkbox"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;