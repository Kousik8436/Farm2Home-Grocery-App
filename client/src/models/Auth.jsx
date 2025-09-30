import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Auth = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setShowUserLogin, setUser, axios, navigate, fetchUser}=useContext(AppContext);

    const submitHandler = async(e)=>{
        try {
            e.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`,{
                name, email, password
            });
            if(data.success){
                toast.success(data.message);
                // Fetch user data to ensure proper session
                await fetchUser();
                setShowUserLogin(false);
                navigate("/");
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Login/Signup Error:", error);
            if (error.code === 'ERR_NETWORK') {
                toast.error("Cannot connect to server. Make sure backend is running.");
            } else {
                toast.error(error.response?.data?.message || "An error occurred");
            }
        }
        
    }

    const {user} = useContext(AppContext);
    const currentPath = window.location.pathname;
    const publicRoutes = ["/", "/products"];
    const isPublicRoute = publicRoutes.includes(currentPath) || currentPath.startsWith("/products/") || currentPath.startsWith("/product/");
    const isAuthRequired = !user && !isPublicRoute && !currentPath.includes("seller");
    
    const handleBackdropClick = () => {
        if (!isAuthRequired) {
            setShowUserLogin(false);
        }
    };

    return (
        <div onClick={handleBackdropClick} className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-400/20 backdrop-blur-sm text-gray-600 animate-fadeIn animate-gradientShift">
            <form onSubmit={submitHandler} onClick={(e) => e.stopPropagation()} className="relative flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-gradient-to-br from-white to-orange-50 animate-slideInUp overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="floating-particle animate-float1"></div>
                <div className="floating-particle animate-float2"></div>
                <div className="floating-particle animate-float3"></div>
            </div>
            {isAuthRequired && (
                <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium animate-pulse relative z-10">
                    🔒 Login Required
                </div>
            )}
            <p className="text-2xl font-medium m-auto bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent animate-bounce-slow relative z-10">
                <span className="text-indigo-500">🔐 User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full animate-slideInLeft relative z-10">
                    <p className="text-gray-700 font-medium">Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-orange-500 focus:border-orange-400 transition-all duration-300 focus:shadow-lg focus:scale-105" type="text" required />
                </div>
            )}
            <div className="w-full animate-slideInLeft relative z-10" style={{animationDelay: '0.1s'}}>
                <p className="text-gray-700 font-medium">📧 Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-orange-500 focus:border-orange-400 transition-all duration-300 focus:shadow-lg focus:scale-105" type="email" required />
            </div>
            <div className="w-full animate-slideInLeft relative z-10" style={{animationDelay: '0.2s'}}>
                <p className="text-gray-700 font-medium">🔒 Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-orange-500 focus:border-orange-400 transition-all duration-300 focus:shadow-lg focus:scale-105" type="password" required />
            </div>
            {state === "register" ? (
                <p className="animate-fadeIn relative z-10">
                    Already have account? <span onClick={() => setState("login")} className="text-orange-500 cursor-pointer hover:text-orange-600 transition-colors animate-pulse">click here</span>
                </p>
            ) : (
                <p className="animate-fadeIn relative z-10">
                    Create an account? <span onClick={() => setState("register")} className="text-orange-500 cursor-pointer hover:text-orange-600 transition-colors animate-pulse">click here</span>
                </p>
            )}
            <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1 text-white w-full py-2 rounded-md cursor-pointer shadow-lg animate-pulse relative z-10 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">🚀 {state === "register" ? "Create Account" : "Login"}</span>
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
                0% { background: linear-gradient(45deg, rgba(251, 146, 60, 0.2), rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2)); }
                33% { background: linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2)); }
                66% { background: linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), rgba(251, 146, 60, 0.2)); }
                100% { background: linear-gradient(45deg, rgba(251, 146, 60, 0.2), rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2)); }
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
                background: linear-gradient(45deg, #f97316, #ec4899);
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
    );
};
export default Auth;