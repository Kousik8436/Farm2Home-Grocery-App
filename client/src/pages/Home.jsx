import React from 'react'
import { Hero } from '../components/Hero';
import Category from '../components/Category';
import { BestSeller } from '../components/BestSeller';
import NewsLetter from '../components/NewsLetter';

function Home() {
  return (
    <div className='space-y-16'>
      <Hero/>
      
      {/* Features Section */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 mx-2 sm:mx-4 shadow-xl border border-gray-100 dark:border-gray-700'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10'>
          <div className='text-center group'>
            <div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg'>
              <span className='text-2xl sm:text-3xl'>🚚</span>
            </div>
            <h3 className='font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800 dark:text-white'>Fast Delivery</h3>
            <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed px-2'>Get fresh groceries delivered in 30 minutes</p>
          </div>
          <div className='text-center group'>
            <div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg'>
              <span className='text-2xl sm:text-3xl'>🌱</span>
            </div>
            <h3 className='font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800 dark:text-white'>Fresh Quality</h3>
            <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed px-2'>100% fresh and organic products guaranteed</p>
          </div>
          <div className='text-center group sm:col-span-2 lg:col-span-1'>
            <div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg'>
              <span className='text-2xl sm:text-3xl'>💰</span>
            </div>
            <h3 className='font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800 dark:text-white'>Best Prices</h3>
            <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed px-2'>Competitive prices with amazing deals daily</p>
          </div>
        </div>
      </div>
      
      <Category/>
      <BestSeller />
      
      {/* Call to Action Section */}
      <div className='bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 mx-2 sm:mx-4 text-center text-white shadow-xl'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight'>Ready to Start Shopping?</h2>
        <p className='text-base sm:text-lg mb-6 sm:mb-8 opacity-90 px-2 sm:px-4 leading-relaxed'>Join thousands of happy customers and get fresh groceries delivered to your door</p>
        <button className='bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base'>
          Start Shopping Now →
        </button>
      </div>
      
      <NewsLetter/>
    </div>
  );
};

export default Home;