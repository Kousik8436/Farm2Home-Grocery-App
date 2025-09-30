import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from "react";
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';

// Create axios instance with direct URL
const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    timeout: 10000
});

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);



    //check seller status
    const fetchSeller = async () => {
        try {
            const {data} = await api.get("/api/seller/is-auth");
            if(data.success){
                setIsSeller(true);
                localStorage.setItem('sellerAuth', 'true');
            }else{
                setIsSeller(false);
                localStorage.removeItem('sellerAuth');
            }
        } catch (error) {
            setIsSeller(false);
            localStorage.removeItem('sellerAuth');
        }
    }

    //seller logout
    const sellerLogout = async () => {
        try {
            await api.post("/api/seller/logout");
            setIsSeller(false);
            localStorage.removeItem('sellerAuth');
            navigate("/seller");
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Logout error:", error);
        }
    }

    //user logout
    const userLogout = async () => {
        try {
            await api.post("/api/user/logout");
            setUser(null);
            setCartItems({});
            navigate("/");
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Logout error:", error);
            setUser(null);
            setCartItems({});
        }
    }

    //check user status
    const fetchUser = async () => {
        try {
            const {data} = await api.get("/api/user/is-auth");
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            }else{
                setUser(null);
                setCartItems({});
            }
        } catch (error) {
            setUser(null);
            setCartItems({});
        } finally {
            setAuthChecked(true);
        }
    }

    //fetch all products data
    const fetchProducts = async () => {
        try{
            const {data} = await api.get("/api/product/list");
            if(data.success && data.products.length > 0){
                setProducts(data.products);
            }else{
                setProducts(dummyProducts);
            }
        }catch(error){
            setProducts(dummyProducts);
        }
    };
    //Product add to cart
    const addToCart=(itemId)=>{
        let cartData = structuredClone(cartItems || {});
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("added to cart");
    };

    //Update cart item quantity
    const updateCartItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("cart updated");
    };
    //total cart items
    const cartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
    };
    //total cart amount
    const totalCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            if(cartItems[items]>0){
                totalAmount+=cartItems[items]*itemInfo.offerPrice;
            }
        }
        return Math.floor(totalAmount *100)/100;
    };
    //remove product from cart
    const removeFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]-=1;
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        toast.success("removed from cart");
        setCartItems(cartData);
    };

    //wishlist functions
    const addToWishlist = (itemId) => {
        if (!wishlist.includes(itemId)) {
            setWishlist([...wishlist, itemId]);
            toast.success("Added to wishlist ❤️");
        }
    };

    const removeFromWishlist = (itemId) => {
        setWishlist(wishlist.filter(id => id !== itemId));
        toast.success("Removed from wishlist");
    };

    const isInWishlist = (itemId) => {
        return wishlist.includes(itemId);
    };

    //dark mode functions
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        if (newDarkMode) {
            document.body.style.backgroundColor = '#1f2937';
            document.body.style.color = '#f9fafb';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#111827';
            localStorage.setItem('theme', 'light');
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.style.backgroundColor = '#1f2937';
            document.body.style.color = '#f9fafb';
        }
    }, []);

    // Sync cartItems to database when user is logged in
    useEffect(() => {
        if(user && Object.keys(cartItems).length > 0) {
            const updateCartInDB = async () => {
                try {
                    await api.post("/api/cart/update", { cartItems });
                } catch (error) {
                    console.log("Cart sync failed:", error);
                }
            };
            updateCartInDB();
        }
    }, [cartItems, user]);

    useEffect(() => {
        fetchProducts();
        // Check localStorage first for faster initial load
        const savedSellerAuth = localStorage.getItem('sellerAuth');
        if (savedSellerAuth === 'true') {
            fetchSeller();
        } else {
            setIsSeller(false);
        }
        // Check user authentication properly
        fetchUser();
    }, []);

    const value={
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        addToCart,
        updateCartItem,
        cartCount,
        totalCartAmount,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        axios: api,
        fetchProducts,
        setCartItems,
        fetchSeller,
        sellerLogout,
        userLogout,
        fetchUser,
        authChecked,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isDarkMode,
        toggleDarkMode,
    };
    return (
<AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
)
}

export default AppContextProvider;