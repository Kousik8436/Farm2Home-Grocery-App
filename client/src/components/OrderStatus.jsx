const OrderStatus = ({ status }) => {
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Order Placed':
        return { color: 'bg-blue-500', icon: '📦', progress: 25 };
      case 'Processing':
        return { color: 'bg-yellow-500', icon: '⚡', progress: 50 };
      case 'Shipped':
        return { color: 'bg-purple-500', icon: '🚚', progress: 75 };
      case 'Delivered':
        return { color: 'bg-green-500', icon: '✅', progress: 100 };
      default:
        return { color: 'bg-gray-500', icon: '❓', progress: 0 };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 ${statusInfo.color} rounded-full flex items-center justify-center text-white text-sm`}>
        {statusInfo.icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{status}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className={`h-2 ${statusInfo.color} rounded-full transition-all duration-500`}
            style={{ width: `${statusInfo.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;