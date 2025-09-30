import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div className='relative overflow-hidden'>
        {/* Background Images */}
        <img src={assets.main_banner_bg} alt="" className='hidden md:block w-full'/>
        <img src={assets.main_banner_bg_sm} alt="" className='md:hidden w-full'/>
        
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-float'></div>
            <div className='absolute top-32 right-20 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-float-delayed'></div>
            <div className='absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-float-slow'></div>
        </div>
        
        {/* Content Overlay */}
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24'>
            <div className='animate-slideInUp'>
                <h1 className='text-3xl md:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-2xl leading-tight lg:leading-tight'>
                    <span className='bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient'>
                        Freshness You can Trust,
                    </span>
                    <br />
                    <span className='text-gray-800 mt-2 block animate-slideInRight'>
                        Savings You will Love!
                    </span>
                </h1>
                
                <p className='text-gray-600 mt-4 text-lg max-w-md animate-fadeInUp' style={{animationDelay: '0.3s'}}>
                    Fresh groceries delivered to your doorstep in 30 minutes. Quality guaranteed! 🍎🥕
                </p>
            </div>
            
            <div className='flex items-center mt-8 font-medium gap-4 animate-fadeInUp' style={{animationDelay: '0.6s'}}>
                <Link to="/products" className='group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>
                    <span className='relative z-10 flex items-center gap-2'>
                        Shop Now
                        <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </span>
                    <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity'></div>
                </Link>

                <Link to="/products" className='hidden md:flex group items-center gap-2 px-8 py-4 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white rounded-full transition-all duration-300 transform hover:scale-105'>
                    Explore Deals
                    <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                </Link>
            </div>
            
            {/* Stats Section - Moved higher */}
            <div className='hidden md:flex items-center gap-6 mt-6 animate-fadeInUp' style={{animationDelay: '0.9s'}}>
                <div className='text-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2'>
                    <div className='text-xl font-bold text-orange-600'>10K+</div>
                    <div className='text-xs text-gray-700'>Customers</div>
                </div>
                <div className='text-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2'>
                    <div className='text-xl font-bold text-green-600'>30min</div>
                    <div className='text-xs text-gray-700'>Delivery</div>
                </div>
                <div className='text-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2'>
                    <div className='text-xl font-bold text-blue-600'>500+</div>
                    <div className='text-xs text-gray-700'>Products</div>
                </div>
            </div>
        </div>
        
        <style jsx>{`
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
            @keyframes float-delayed {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(-180deg); }
            }
            @keyframes float-slow {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(90deg); }
            }
            @keyframes gradient {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            @keyframes slideInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideInRight {
                from { transform: translateX(-30px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeInUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
            .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
            .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% 200%; }
            .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
            .animate-slideInRight { animation: slideInRight 0.8s ease-out 0.2s both; }
            .animate-fadeInUp { animation: fadeInUp 0.8s ease-out both; }
        `}</style>
    </div>
  )
}
