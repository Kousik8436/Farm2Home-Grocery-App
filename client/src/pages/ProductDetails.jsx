import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import HeartButton from "../components/HeartButton";

const ProductDetails = () => {
    const { products,navigate, addToCart } = useContext(AppContext);
    const {category, id} = useParams();
    const [thumbnail, setThumbnail] = useState(null);
    console.log('Route category:', category, 'id:', id);
    console.log('Products:', products);
    const product = products.find((product) => product._id === id);
    console.log('Found product:', product);
    useEffect(() => {
      setThumbnail(product?.image[0]?product.image[0]:null);
    },[product]);
    if (!product) {
        return <div className="max-w-6xl w-full px-6 py-10">Product not found. Category: {category}, ID: {id}</div>;
    }
    
    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-10 shadow-lg">
                <div className="flex items-center gap-4 mb-3">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">Fresh & Premium Quality</span>
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                    {Array(5).fill('').map((_, i) => (
                      <img src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" key={i} className="w-5 h-5"/>
                    ))}
                    <span className="text-gray-600 dark:text-gray-300 ml-2 font-medium">(4.0) • 127 reviews</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1 justify-center sm:justify-start">
                                {product.image.map((image, index) => (
                                    <div key={index} onClick={() => setThumbnail(image)} 
                                         className={`border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                                             thumbnail === image ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                                         }`}>
                                        <img src={`http://localhost:5000/images/${image}`} alt={`Thumbnail ${index + 1}`} 
                                             className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 order-1 sm:order-2">
                                <img src={`http://localhost:5000/images/${thumbnail}`} alt="Selected product" 
                                     className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Price Section */}
                    <div className="bg-gradient-to-r from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                            <span className="text-base sm:text-lg text-gray-500 line-through">₹{product.price}</span>
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold w-fit">
                                {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-200 mb-2">₹{product.offerPrice}</div>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Inclusive of all taxes • Free delivery</p>
                    </div>

                    {/* Description */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 sm:h-6 bg-orange-500 rounded"></span>
                            Product Details
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {product.description.map((desc, index) => (
                                <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                                    <span className="text-sm sm:text-base leading-relaxed">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <HeartButton productId={product._id} className="p-3 sm:p-4 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-all duration-300 self-center sm:self-auto" />
                            <button onClick={() => addToCart(product._id)} 
                                    className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg sm:rounded-xl hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base">
                                🛒 Add to Cart
                            </button>
                            <button onClick={() => { addToCart(product._id); navigate("/cart"); }} 
                                    className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base">
                                ⚡ Buy Now
                            </button>
                        </div>
                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg sm:rounded-xl">
                            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                                <span className="text-base sm:text-lg">✅</span>
                                <span className="font-medium text-sm sm:text-base">In Stock • Fast Delivery Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;