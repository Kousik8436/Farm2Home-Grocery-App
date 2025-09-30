import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Footer = () => {
    const { isDarkMode } = useContext(AppContext);
    
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
            
            <footer className={`relative w-full py-12 mt-16 text-white overflow-hidden ${
                isDarkMode ? '' : 'animate-gradientShift'
            }`} style={{
                background: isDarkMode 
                    ? 'linear-gradient(-45deg, #374151, #4b5563, #6b7280, #9ca3af, #374151)' 
                    : 'linear-gradient(-45deg, #f97316, #ea580c, #dc2626, #b91c1c, #fb923c)',
                backgroundSize: '400% 400%',
                animation: isDarkMode ? 'none' : 'gradientShift 8s ease infinite'
            }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" style={{animation: 'float 3s ease-in-out infinite'}}></div>
                    <div className="absolute top-20 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg" style={{animation: 'float 3s ease-in-out infinite', animationDelay: '1s'}}></div>
                    <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white/20 rounded-full blur-md" style={{animation: 'float 3s ease-in-out infinite', animationDelay: '2s'}}></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">Farm2Home</h2>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <a href="#" className="relative font-medium text-orange-100 hover:text-orange-50 transition-all duration-300 group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-300 to-red-300 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#" className="relative font-medium text-red-100 hover:text-red-50 transition-all duration-300 group">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-300 to-orange-300 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#" className="relative font-medium text-orange-100 hover:text-orange-50 transition-all duration-300 group">
                            Services
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#" className="relative font-medium text-red-100 hover:text-red-50 transition-all duration-300 group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-300 to-orange-300 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#" className="relative font-medium text-orange-100 hover:text-orange-50 transition-all duration-300 group">
                            Help
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-300 to-red-300 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="group p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#" className="group p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#" className="group p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#" className="group p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                    <div className="text-center">
                        <p className="text-orange-100 text-sm">
                            Copyright © 2025 <span className="font-semibold bg-gradient-to-r from-orange-200 to-red-200 bg-clip-text text-transparent">Farm2Home</span>. All rights reserved.
                        </p>
                        <p className="text-red-200 text-xs mt-2">
                            Made with <span className="text-red-300">❤️</span> for fresh grocery delivery
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;