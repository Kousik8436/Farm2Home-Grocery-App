import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import HeartButton from './HeartButton';

function ProductCard({ product }) {
    const {navigate,addToCart,cartItems,removeFromCart} = useContext(AppContext);
  return product && (
     <div onClick={() => navigate(`/product/${product.category.toLowerCase()}/${product._id}`)} className="group border border-gray-200 rounded-xl px-4 py-5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:border-orange-200 relative w-full min-h-[350px] flex flex-col overflow-hidden">
            <div className="relative flex items-center justify-center px-2 mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img className="relative z-10 group-hover:scale-110 transition-transform duration-300 max-w-26 md:max-w-36 drop-shadow-sm" src={`http://localhost:5000/images/${product.image[0]}`} alt={product.name} />
                <div className="absolute top-2 right-2 z-20">
                    <HeartButton productId={product._id} />
                </div>
            </div>
            <div className="text-gray-500/60 text-sm space-y-2">
                <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">{product.category}</p>
                <h3 className="text-gray-800 font-semibold text-base md:text-lg truncate w-full group-hover:text-orange-700 transition-colors">{product.name}</h3>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-3 md:w-3.5"
                />
              ))}
            <p>(4)</p>
          </div>
                <div className="flex items-center justify-between mt-auto pt-3 w-full">
                    <div className="flex items-center gap-2">
                        <p className="md:text-xl text-lg font-bold text-orange-600">
                            ₹{product.offerPrice}
                        </p>
                        <span className="text-gray-400 md:text-sm text-xs line-through">₹{product.price}</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                        </span>
                    </div>
                    <div className="text-orange-500 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        {!cartItems?.[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-indigo-100 hover:bg-indigo-200 border border-indigo-300 hover:border-indigo-400 px-3 py-2 rounded-lg text-indigo-600 font-medium text-sm transition-all duration-200 min-w-[70px]" onClick={() => addToCart(product._id)} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 px-2 py-2 rounded-lg select-none min-w-[70px]">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
  )
};

export default ProductCard;