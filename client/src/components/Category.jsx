import React, { useContext } from 'react'
import { categories } from '../assets/assets';
import { AppContext } from '../context/AppContext';

function Category() {
    const {navigate} = useContext(AppContext);
  return (
    <div className='px-4'>
         <div className='text-center mb-8 sm:mb-10 md:mb-12 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mx-2 sm:mx-4'>
           <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-2 sm:mb-3 md:mb-4'>Shop by Categories</h2>
           <p className='text-black dark:text-white text-base sm:text-lg md:text-xl font-bold px-2'>Discover fresh products across all categories</p>
         </div>
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0'>
            {
                categories.map((category,index)=>(
                    <div onClick={() => {navigate(`/products/${category.path.toLowerCase()}`); scrollTo(0,0);}} key={index} className={`group cursor-pointer py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4 rounded-xl sm:rounded-2xl gap-2 sm:gap-3 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl`} style={{background: category.bgColor}}>
                        <div className='relative'>
                          <img src={category.image} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain transition-transform group-hover:scale-110'/>
                          <div className='absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></div>
                        </div>
                        <p className='text-xs sm:text-sm md:text-base font-semibold text-center leading-tight px-1'>{category.text}</p>
                    </div>
                ))
            }
         </div>
    </div>
  )
}

export default Category;