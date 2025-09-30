import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from "../assets/assets";
import SearchSuggestions from './SearchSuggestions';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {user, setUser, navigate, setShowUserLogin, cartCount, searchQuery, setSearchQuery, userLogout, wishlist, isDarkMode} = useContext(AppContext);
    useEffect(() => {
        if(searchQuery.length>0){
        navigate("/products");
    }
    },[searchQuery, navigate]);
    return (
        <nav className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b backdrop-blur-sm relative transition-all duration-300 sticky top-0 z-50 shadow-lg ${
            isDarkMode 
                ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-gray-600' 
                : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 border-orange-200/50 animate-gradientShift'
        }`}>
            <Link to={"/"} className="flex items-center gap-3 group">
                <div className="relative">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {/* Shopping basket */}
                        <path d="M3 7H21L19 17H5L3 7Z" fill="#ffffff" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M8 7V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
                        {/* Vegetables/produce in basket */}
                        <circle cx="9" cy="12" r="1.5" fill="#16a34a" className="animate-pulse"/>
                        <circle cx="12" cy="11" r="1.5" fill="#dc2626" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
                        <circle cx="15" cy="12" r="1.5" fill="#eab308" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
                    </svg>

                </div>
                <h1 className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-yellow-200 transition-all duration-300 font-black">
                    Farm2Home
                </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to={"/"} onClick={() => setSearchQuery("")} className="relative text-white hover:text-yellow-200 transition-colors duration-300 font-medium group">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-200 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to={"/products"} onClick={() => setSearchQuery("")} className="relative text-white hover:text-yellow-200 transition-colors duration-300 font-medium group">
                    All Products
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-200 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-4 py-2 rounded-full hover:border-orange-300 focus-within:border-orange-500 focus-within:shadow-lg transition-all duration-300 bg-gray-50 hover:bg-white relative">
                    <input 
                        onChange={(e)=>setSearchQuery(e.target.value)} 
                        value={searchQuery}
                        className="py-1 w-full bg-transparent outline-none placeholder-gray-500 text-gray-700" 
                        type="text" 
                        placeholder="Search fresh products..." 
                    />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <SearchSuggestions 
                        query={searchQuery} 
                        onSelect={(product) => {
                            navigate(`/product/${product.category}/${product._id}`);
                            setSearchQuery('');
                        }} 
                    />
                </div>

                <div onClick={()=>navigate("/wishlist")} className="relative cursor-pointer group">
                    <div className="p-2 rounded-full hover:bg-red-50 transition-colors duration-300">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">❤️</span>
                    </div>
                    {wishlist.length > 0 && (
                        <div className="absolute -top-1 -right-1 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold animate-bounce">
                            {wishlist.length}
                        </div>
                    )}
                </div>

                <div onClick={()=>navigate("/cart")} className="relative cursor-pointer group">
                    <div className="p-2 rounded-full hover:bg-orange-50 transition-colors duration-300">
                        <img src={assets.cart_icon} className='w-7 h-7 group-hover:scale-110 transition-transform duration-300'/>
                    </div>
                    {cartCount() > 0 && (
                        <div className="absolute -top-1 -right-1 text-xs text-white bg-gradient-to-r from-orange-500 to-red-500 min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold animate-bounce">
                            {cartCount()}
                        </div>
                    )}
                </div>

                <DarkModeToggle />

                {user?(
                    <>
                    <div className="relative group">
                        <img src={assets.profile_icon} alt="" className="w-10 rounded-full border-2 border-white/50 hover:border-yellow-200 transition-all duration-300 hover:scale-110 cursor-pointer"/>
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-gradient-to-br from-white to-orange-50 shadow-xl rounded-xl border border-orange-200 py-3 w-40 z-40 text-sm animate-slideDown">
                            <li onClick={() =>{
                                navigate("/my-orders");
                            }} className='px-4 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-orange-100 hover:to-pink-100 transition-all duration-300 flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium'>
                                📦 My Orders
                            </li>
                            <li onClick={() =>{
                                navigate("/wishlist");
                            }} className='px-4 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 transition-all duration-300 flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium'>
                                ❤️ Wishlist
                            </li>
                            <li onClick={userLogout} className='px-4 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 transition-all duration-300 flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium'>
                                🚪 Logout
                            </li>
                        </ul>
                    </div>
                    </>
                ): (
                    <button onClick={() => {
                        setShowUserLogin(true);
                    }} className="relative overflow-hidden cursor-pointer px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium">
                        <span className="relative z-10">Login</span>
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <Link to={"/"} onClick={() => setSearchQuery("")}>Home</Link>
                <Link to={"/products"} onClick={() => setSearchQuery("")}>All Products</Link>
                {user?(
                    <>
                    <div className="relative group">
                        <img src={assets.profile_icon} alt="" className="w-10"/>
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-30 z-40 text-sm">
                            <li onClick={() =>{
                                navigate("/my-orders");
                            }} className='p-1.5 cursor-pointer'>My Orders</li>
                            <li onClick={userLogout} className='p-1.5 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                    </>
                ): (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                </button>
                )}
            </div>
            <style jsx>{`
                @keyframes gradientShift {
                    0% { background: linear-gradient(90deg, #f97316, #ec4899, #8b5cf6); }
                    33% { background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6); }
                    66% { background: linear-gradient(90deg, #8b5cf6, #3b82f6, #f97316); }
                    100% { background: linear-gradient(90deg, #f97316, #ec4899, #8b5cf6); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-gradientShift {
                    animation: gradientShift 8s ease-in-out infinite;
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }finite;
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </nav>
    )
}
export default Navbar;