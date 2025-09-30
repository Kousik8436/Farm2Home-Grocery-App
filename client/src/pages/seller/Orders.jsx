import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {axios} = useContext(AppContext);
    
    const fetchOrders = async() => {
        try {
            setLoading(true);
            const {data} = await axios.get("/api/order/seller");
            if(data.success) {
                setOrders(data.orders || []);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.log("Orders fetch error:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchOrders();
    }, []);
    
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex justify-center items-center">
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading orders...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                    📋 Orders Management
                                </h1>
                                <p className="text-purple-100 mt-2">Track and manage customer orders</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                    <span className="text-white font-semibold">{orders.length} Orders</span>
                                </div>
                                <button 
                                    onClick={fetchOrders}
                                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2"
                                >
                                    🔄 Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {orders.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-medium text-gray-600 mb-2">No orders found</h3>
                                <p className="text-gray-500 mb-4">Customer orders will appear here when they place orders</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order, index) => (
                                    <div key={order._id || index} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                        {/* Order Header */}
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                        <span className="text-purple-600 font-bold text-lg">📝</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 text-lg">Order #{order._id?.slice(-8) || index + 1}</h3>
                                                        <p className="text-sm text-gray-600">📅 {new Date(order.createdAt).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-green-600">₹{order.amount}</p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                        order.paymentType === 'COD' 
                                                            ? 'bg-yellow-100 text-yellow-800' 
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {order.paymentType === 'COD' ? '💵 Cash on Delivery' : '💳 Online Payment'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="px-6 py-4">
                                            {order.items && order.items.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                        🛍️ Order Items
                                                    </h4>
                                                    <div className="grid gap-3">
                                                        {order.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                                                                {item.product && (
                                                                    <>
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                                <span className="text-blue-600 font-bold">{item.quantity}</span>
                                                                            </div>
                                                                            <span className="font-medium text-gray-800">{item.product.name || 'Product'}</span>
                                                                        </div>
                                                                        <span className="text-gray-600 font-medium">₹{(item.product.offerPrice || 0) * item.quantity}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Delivery Address */}
                                            {order.address && (
                                                <div className="bg-blue-50 rounded-lg p-4">
                                                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                        📦 Delivery Address
                                                    </h4>
                                                    <p className="text-gray-700">
                                                        <strong>{order.address.firstName} {order.address.lastName}</strong>
                                                    </p>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;