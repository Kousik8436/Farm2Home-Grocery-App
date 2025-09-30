import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function SellerLogin() {
    const {isSeller, setIsSeller, navigate, axios} = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        if(isSeller){
            navigate("/seller");
        }
    },[isSeller]);
    
    const submitHandler = async(e)=>{
        try {
            e.preventDefault();
            if (!email || !password) {
                toast.error("Please fill in all fields");
                return;
            }
            
            setLoading(true);
            const {data} = await axios.post("/api/seller/login", {email, password});
            
            if(data.success){
                setIsSeller(true);
                localStorage.setItem('sellerAuth', 'true');
                navigate("/seller");
                toast.success(data.message || "Login successful!");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

  return !isSeller && (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20 backdrop-blur-sm text-gray-600 animate-fadeIn animate-gradientShift">
            <form onClick={(e) => e.stopPropagation()} onSubmit={submitHandler} className="relative flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 animate-slideInUp overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="floating-particle animate-float1"></div>
                <div className="floating-particle animate-float2"></div>
                <div className="floating-particle animate-float3"></div>
            </div>
            <p className="text-2xl font-medium m-auto bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-bounce-slow relative z-10">
                <span className="text-indigo-500">🏢 Seller</span> Login
            </p>
            
            <div className="w-full animate-slideInLeft relative z-10">
                <p className="text-gray-700 font-medium">📧 Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter seller email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500 focus:border-blue-400 transition-all duration-300 focus:shadow-lg focus:scale-105" type="email" required disabled={loading} />
            </div>
            <div className="w-full animate-slideInLeft relative z-10" style={{animationDelay: '0.1s'}}>
                <p className="text-gray-700 font-medium">🔒 Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter seller password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500 focus:border-blue-400 transition-all duration-300 focus:shadow-lg focus:scale-105" type="password" required disabled={loading} />
            </div>
           
            <button disabled={loading} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1 text-white w-full py-2 rounded-md cursor-pointer shadow-lg animate-pulse relative z-10 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">
                    {loading ? "🔄 Logging in..." : "🚀 Login"}
                </span>
            </button>
        </form>
        
        <style jsx>{`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideInLeft {
                from { transform: translateX(-20px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes gradientShift {
                0% { background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2)); }
                33% { background: linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2)); }
                66% { background: linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2)); }
                100% { background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2)); }
            }
            @keyframes float1 {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                33% { transform: translate(30px, -30px) rotate(120deg); }
                66% { transform: translate(-20px, 20px) rotate(240deg); }
            }
            @keyframes float2 {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(-40px, -20px) rotate(180deg); }
            }
            @keyframes float3 {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(20px, 30px) rotate(90deg); }
                75% { transform: translate(-30px, -10px) rotate(270deg); }
            }
            @keyframes bounce-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            .floating-particle {
                position: absolute;
                width: 8px;
                height: 8px;
                background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                border-radius: 50%;
                opacity: 0.6;
            }
            .floating-particle:nth-child(1) { top: 20%; left: 10%; }
            .floating-particle:nth-child(2) { top: 60%; right: 15%; }
            .floating-particle:nth-child(3) { bottom: 30%; left: 20%; }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
            }
            .animate-slideInUp {
                animation: slideInUp 0.4s ease-out;
            }
            .animate-slideInLeft {
                animation: slideInLeft 0.5s ease-out;
            }
            .animate-gradientShift {
                animation: gradientShift 6s ease-in-out infinite;
            }
            .animate-float1 {
                animation: float1 8s ease-in-out infinite;
            }
            .animate-float2 {
                animation: float2 6s ease-in-out infinite;
            }
            .animate-float3 {
                animation: float3 10s ease-in-out infinite;
            }
            .animate-bounce-slow {
                animation: bounce-slow 2s ease-in-out infinite;
            }
        `}</style>
        </div>
  )
}

export default SellerLogin;