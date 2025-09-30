import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { dummyAddress } from '../assets/assets';
import toast from 'react-hot-toast';
import StripePaymentForm from '../components/StripePaymentForm';

function Cart() {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    removeFromCart,
    updateCartItem,
    setSearchQuery,
    axios,user,setCartItems
  } = useContext(AppContext);

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  const getAddress = async()=>{
    try {
      const {data} = await axios.get("/api/address/get");
      if(data.success){
        setAddress(data.addresses);
        if(data.addresses.length>0){
          setSelectedAddress(data.addresses[0]);
        }
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(user){
      getAddress();
    }
  },[user])

  // Refresh addresses when component becomes visible (user returns from add address page)
  useEffect(() => {
    const handleFocus = () => {
      if(user) {
        getAddress();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      getCart();
    }
    // Clear search query when cart loads to prevent interference
    setSearchQuery("");
    
    // Refresh addresses when cart loads
    if(user) {
      getAddress();
    }
  }, [products, cartItems, user]);
//place order with cod
  const placeOrder = async() => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      
      if (!user) {
        return toast.error("Please login to place order");
      }
      
      if (cartArray.length === 0) {
        return toast.error("Your cart is empty");
      }
      
      if(paymentOption === "COD"){
        const {data} = await axios.post("/api/order/cod",{
          items: cartArray.map((item)=>({
            product: item._id,
            quantity: item.quantity
          })),
          address: selectedAddress._id,
          amount: totalCartAmount()
        });
        
        if(data.success){
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        }else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post("/api/order/stripe",{
          items: cartArray.map((item)=>({
            product: item._id,
            quantity: item.quantity
          })),
          address: selectedAddress._id,
          amount: totalCartAmount()
        });
        if(data.success && data.clientSecret){
          setPaymentData({
            orderId: data.orderId,
            amount: data.amount
          });
          setClientSecret(data.clientSecret);
          setShowPaymentForm(true);
        }else{
          toast.error(data.message || "Payment failed");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return products.length > 0 ? (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 py-8">
      <div className="flex flex-col md:flex-row max-w-6xl w-full px-6 mx-auto gap-8 animate-fadeIn">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="flex-1 max-w-4xl">
          <div className="mb-8 animate-slideInLeft">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Shopping Cart 🛒
            </h1>
            <p className="text-lg text-gray-600">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 font-semibold animate-pulse">
                {cartCount()} Items
              </span>
            </p>
          </div>

          {/* HEADINGS */}
          <div
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-base font-semibold pb-4 mb-4 border-b-2 border-orange-200 animate-slideInLeft"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-left text-orange-700">Product Details</p>
            <p className="text-center text-pink-700">Subtotal</p>
            <p className="text-center text-purple-700">Action</p>
          </div>

          {/* CART ITEMS */}
          {Object.keys(cartItems).length === 0 ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <button
                onClick={() => {
                  navigate("/products");
                  window.scrollTo(0, 0);
                }}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                🛍️ Start Shopping
              </button>
            </div>
          ) : (
            cartArray.map((product, index) => (
            <div
              key={index}
              className="group grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium p-4 mb-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* PRODUCT DETAILS */}
              <div className="flex items-center md:gap-6 gap-3">
                <div
                  onClick={() => {
                    navigate(
                      `/product/${product.category.toLowerCase()}/${product._id}`
                    );
                    window.scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border-2 border-orange-200 rounded-xl overflow-hidden hover:border-orange-400 transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-orange-50 to-pink-50"
                >
                  <img
                    className="max-w-full h-full object-cover rounded-lg"
                    src={`http://localhost:5000/images/${product.image[0]}`}
                    alt={product.name}
                  />
                </div>
                <div>
                  <p className="hidden md:block font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </p>
                  <div className="font-normal text-gray-500/70">
                    <p>
                      Weight: <span>{product.weight || "N/A"}</span>
                    </p>
                    <div className="flex items-center">
                      <p>Qty:</p>
                      <select
                        onChange={(e) =>
                          updateCartItem(product._id, Number(e.target.value))
                        }
                        value={cartItems[product._id]}
                        className="outline-none"
                      >
                        {Array.from(
                          {
                            length:
                              cartItems[product._id] > 9
                                ? cartItems[product._id]
                                : 9,
                          },
                          (_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBTOTAL */}
              <p className="text-center font-bold text-lg bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                ₹{(product.offerPrice * product.quantity).toFixed(2)}
              </p>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(product._id)}
                className="cursor-pointer mx-auto p-2 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:rotate-90 transition-transform duration-300"
                >
                  <path
                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="#FF532E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))
          )}

          {/* CONTINUE SHOPPING */}
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
          >
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="#615fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Continue Shopping
          </button>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        {Object.keys(cartItems).length > 0 && (
        <div className="max-w-[360px] w-full bg-gradient-to-br from-white to-orange-50 p-6 md:ml-auto border border-orange-200 rounded-2xl shadow-lg animate-slideInRight">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
            <span className="text-orange-500">📊</span> Order Summary
          </h2>
          <hr className="border-gray-300 my-5" />

          {/* ADDRESS */}
          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500">
                {selectedAddress
                  ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
                  : "No Address Found"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-indigo-500 hover:underline cursor-pointer"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                  {address.map((addr, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddress(false);
                      }}
                      className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {addr.street}, {addr.city}, {addr.state}, {addr.country}
                    </p>
                  ))}
                  <p
                    onClick={() => navigate("/add-address")}
                    className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>

            {/* PAYMENT */}
            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-300" />

          {/* PRICE CALCULATION */}
          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Price</span>
              <span>₹{totalCartAmount().toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (5%)</span>
              <span>
                ₹{((totalCartAmount() * 5) / 100).toFixed(2)}
              </span>
            </p>
            <p className="flex justify-between text-lg font-medium mt-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              <span>Total Amount:</span>
              <span>
                ₹{(
                  totalCartAmount() +
                  (totalCartAmount() * 5) / 100
                ).toFixed(2)}
              </span>
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={placeOrder}
            className="w-full py-4 mt-6 cursor-pointer bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold rounded-xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse"
          >
            🚀 {paymentOption === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
        )}
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>
      
      {/* Stripe Payment Form Modal */}
      {showPaymentForm && paymentData && clientSecret && (
        <StripePaymentForm
          clientSecret={clientSecret}
          orderId={paymentData.orderId}
          amount={paymentData.amount}
          onSuccess={() => {
            setShowPaymentForm(false);
            setPaymentData(null);
            setClientSecret(null);
            setCartItems({});
            toast.success('Payment completed successfully!');
            navigate("/my-orders");
          }}
          onCancel={() => {
            setShowPaymentForm(false);
            setPaymentData(null);
            setClientSecret(null);
          }}
        />
      )}
    </div>
  ) : null;
}

export default Cart;
