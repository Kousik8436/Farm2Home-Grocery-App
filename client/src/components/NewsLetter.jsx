import React, { useState } from 'react'
import toast from 'react-hot-toast'

function NewsLetter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      toast.success('Successfully subscribed to deals!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="py-16 flex flex-col items-center justify-center text-center space-y-2 bg-gradient-to-r from-orange-50 to-red-50">
            <h1 className="md:text-4xl text-2xl font-semibold flex items-center gap-3">
                <span className="text-4xl md:text-5xl animate-pulse">🔥</span>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Never Miss a Deal!</span>
            </h1>
            <p className="md:text-lg text-gray-600 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered to your inbox
            </p>
            <form onSubmit={handleSubmit} className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-700 focus:border-orange-400"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={loading}
                    required
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="md:px-12 px-8 h-full text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all cursor-pointer rounded-md rounded-l-none disabled:opacity-50"
                >
                    {loading ? '⏳' : '📧 Subscribe'}
                </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">💡 Get notified about flash sales, new products, and special offers!</p>
        </div>
  )
}

export default NewsLetter;