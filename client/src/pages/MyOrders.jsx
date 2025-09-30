import { useContext, useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import OrderStatus from '../components/OrderStatus';

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const {axios, user} = useContext(AppContext);
  
  const fetchOrders = async () =>{
    try {
      const {data}=await axios.get("/api/order/user");
      if(data.success){
        setMyOrders(data.orders);
        setLoading(false);
      }else{
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };
  
  useEffect(() =>{
    if(user){
      fetchOrders();
    }
  },[user]);
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className='mt-12 pb-16 flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600'></div>
      </div>
    );
  }
  
  return (
    <div className='mt-12 pb-16 animate-fadeIn'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold md:text-4xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent animate-slideInDown'>
          My Orders
        </h1>
        <p className='text-gray-600 mt-2 animate-slideInUp'>Track and manage your orders</p>
      </div>
      
      {myOrders.length === 0 ? (
        <div className='text-center py-16 animate-fadeIn'>
          <div className='text-6xl mb-4'>📦</div>
          <h3 className='text-xl font-medium text-gray-600'>No orders yet</h3>
          <p className='text-gray-500 mt-2'>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {myOrders.map((order, index)=>(
            <div key={index} className='group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-slideInUp' style={{animationDelay: `${index * 100}ms`}}>
              {/* Order Header */}
              <div className='bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b border-gray-100'>
                <div className='flex flex-wrap justify-between items-center gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
                      <span className='text-orange-600 font-bold'>#{index + 1}</span>
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800'>Order ID: {order._id.slice(-8)}</p>
                      <p className='text-sm text-gray-600'>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <div className='flex-1'>
                      <OrderStatus status={order.status} />
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-gray-600'>Total Amount</p>
                      <p className='text-xl font-bold text-orange-600'>₹{order.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className='divide-y divide-gray-100'>
                {order.items.map((item, itemIndex)=>(
                  <div key={itemIndex} className='p-6 hover:bg-gray-50 transition-colors duration-200'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                      <div className='flex items-center gap-4'>
                        <div className='relative group-hover:scale-105 transition-transform duration-200'>
                          <img 
                            src={`http://localhost:5000/images/${item.product.image[0]}`} 
                            alt={item.product.name}
                            className='w-16 h-16 object-cover rounded-lg shadow-sm'
                          />
                          <div className='absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold'>
                            {item.quantity}
                          </div>
                        </div>
                        <div>
                          <h3 className='font-semibold text-gray-800 hover:text-orange-600 transition-colors'>
                            {item.product.name}
                          </h3>
                          <p className='text-sm text-gray-600 capitalize'>{item.product.category}</p>
                          <p className='text-sm text-orange-600 font-medium'>₹{item.product.offerPrice} each</p>
                        </div>
                      </div>
                      
                      <div className='flex flex-col md:items-end gap-2'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-gray-600'>Payment:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            order.paymentType === 'Online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.paymentType}
                          </span>
                        </div>
                        <p className='text-lg font-bold text-gray-800'>
                          ₹{item.product.offerPrice * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default MyOrders;