import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import MyOrders from './pages/MyOrders';
import Auth from './models/Auth';
import ProductCategory from './pages/ProductCategory';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import AddAddress from './pages/AddAddress';
import SellerLayout from './pages/seller/SellerLayout';
import SellerLogin from './components/seller/SellerLogin';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import BackToTop from './components/BackToTop';
import Wishlist from './pages/Wishlist';
import Chatbot from './components/Chatbot';
const App = () => {
  const {isSeller, showUserLogin, user, authChecked} = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");
  const currentPath = useLocation().pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/products"];
  const isPublicRoute = publicRoutes.includes(currentPath) || currentPath.startsWith("/products/") || currentPath.startsWith("/product/");
  
  // Show auth modal for protected routes when user is not logged in
  const shouldShowAuth = !user && !isPublicRoute && !isSellerPath && authChecked;
  
  // Show loading screen while checking authentication
  if (!authChecked && !isSellerPath) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Farm2Home...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-default min-h-screen">
      {isSellerPath ? null : <Navbar/>}
      {(showUserLogin || shouldShowAuth) ? <Auth/> : null}
      <Toaster/>

      <div className="px-6 md:px lg:px-24 xl:px-32">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:category/:id" element={<ProductDetails/>} />
          <Route path="/products/:category" element={<ProductCategory/>} />
          <Route path="/cart" element={user ? <Cart/> : <Home/>} />
          <Route path="/my-orders" element={user ? <MyOrders/> : <Home/>} />
          <Route path="/wishlist" element={user ? <Wishlist/> : <Home/>} />
          <Route path="/add-address" element={user ? <AddAddress/> : <Home/>} />

          <Route path="/seller" element={isSeller?<SellerLayout/>:<SellerLogin/>}>
              <Route index element={<AddProduct/>}/>
              <Route path='product-list' element={<ProductList/>}/>
              <Route path='orders' element={<Orders/>}/>
          </Route>

        </Routes>
      </div>
      {isSeller ? null : <Footer/>}
      {!isSellerPath && <BackToTop />}
      {!isSellerPath && <Chatbot />}
    </div>
  )
}

export default App