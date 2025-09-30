import { useContext, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
    const {axios} = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit= async (e) =>{
    try {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("offerPrice", offerPrice);
        formData.append("category", category);

        for(let i=0;i<files.length;i++){
            formData.append("image", files[i]);
        }
        const {data} = await axios.post("/api/product/add-product", formData);
        if(data.success){
            toast.success(data.message);
            setName("");
            setDescription("");
            setPrice("");
            setOfferPrice("");
            setCategory("");
            setFiles([]);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
            toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            🎆 Add New Product
                        </h1>
                        <p className="text-indigo-100 mt-2">Create and manage your product inventory</p>
                    </div>

                    <form onSubmit={handelSubmit} className="p-8 space-y-8">
                        {/* Image Upload Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                📷 Product Images
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Array(4).fill('').map((_, index) => (
                                    <label key={index} htmlFor={`image${index}`} className="group cursor-pointer">
                                        <input 
                                            onChange={(e) =>{
                                                const updatedFiles = [...files];
                                                updatedFiles[index] = e.target.files[0];
                                                setFiles(updatedFiles);
                                            }} 
                                            accept="image/*" 
                                            type="file" 
                                            id={`image${index}`} 
                                            hidden 
                                        />
                                        <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition-all duration-300 group-hover:bg-indigo-50">
                                            {files[index] ? (
                                                <img 
                                                    className="w-full h-full object-cover rounded-xl" 
                                                    src={URL.createObjectURL(files[index])} 
                                                    alt="Preview" 
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-indigo-500">
                                                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <span className="text-xs font-medium">Add Image</span>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="product-name">
                                        🏷️ Product Name
                                    </label>
                                    <input 
                                        id="product-name" 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder="Enter product name" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" 
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="category">
                                        📋 Category
                                    </label>
                                    <select 
                                        id="category" 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)} 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat.path}>{cat.text}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="product-price">
                                            💰 Original Price
                                        </label>
                                        <input 
                                            id="product-price" 
                                            value={price} 
                                            onChange={(e) => setPrice(e.target.value)} 
                                            type="number" 
                                            placeholder="0" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="offer-price">
                                            🏷️ Offer Price
                                        </label>
                                        <input 
                                            id="offer-price" 
                                            value={offerPrice} 
                                            onChange={(e) => setOfferPrice(e.target.value)} 
                                            type="number" 
                                            placeholder="0" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="product-description">
                                    📝 Product Description
                                </label>
                                <textarea 
                                    id="product-description" 
                                    rows={8} 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none" 
                                    placeholder="Describe your product features, benefits, and specifications..."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Adding Product...
                                    </>
                                ) : (
                                    <>
                                        ✨ Add Product
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;