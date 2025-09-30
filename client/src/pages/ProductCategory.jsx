import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
const ProductCategory = () => {
  const { products } = useContext(AppContext);
  const { category } = useParams();
  
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === (category || '').toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === (category || '').toLowerCase() && product.inStock
  );
  return (
    <div className="mt-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-medium">
          {searchCategory ? searchCategory.text : category || 'Category'}
        </h1>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl text-gray-500">
            No products found in this category
          </h2>
        </div>
      )}
    </div>
  );
};
export default ProductCategory;