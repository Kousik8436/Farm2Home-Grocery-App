import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Farm2Home assistant. How can I help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    'hello': "Hello! Welcome to Farm2Home. How can I assist you?",
    'hi': "Hi there! How can I help you with your grocery needs?",
    'delivery': "We offer fast delivery within 30 minutes! Free delivery on orders above ₹500.",
    'payment': "We accept Cash on Delivery (COD) and online payments for your convenience.",
    'fresh': "All our products are 100% fresh and organic, sourced directly from farms.",
    'order': "You can track your orders in the 'My Orders' section after logging in.",
    'help': "I can help you with delivery info, payment methods, product freshness, and order tracking. What would you like to know?",
    'contact': "You can reach us through this chat or visit our contact section for more details.",
    'price': "We offer competitive prices with daily deals and discounts on fresh groceries!",
    'default': "I'm here to help! You can ask me about delivery, payments, fresh products, orders, or anything else about Farm2Home."
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Find matching response
    const lowerInput = inputMessage.toLowerCase();
    let botResponse = predefinedResponses.default;
    
    // Check for specific keywords
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      botResponse = predefinedResponses.hello;
    } else if (lowerInput.includes('delivery') || lowerInput.includes('deliver')) {
      botResponse = predefinedResponses.delivery;
    } else if (lowerInput.includes('payment') || lowerInput.includes('pay') || lowerInput.includes('cod')) {
      botResponse = predefinedResponses.payment;
    } else if (lowerInput.includes('fresh') || lowerInput.includes('organic') || lowerInput.includes('quality')) {
      botResponse = predefinedResponses.fresh;
    } else if (lowerInput.includes('order') || lowerInput.includes('track')) {
      botResponse = predefinedResponses.order;
    } else if (lowerInput.includes('help') || lowerInput.includes('assist')) {
      botResponse = predefinedResponses.help;
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
      botResponse = predefinedResponses.contact;
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('discount')) {
      botResponse = predefinedResponses.price;
    }

    setTimeout(() => {
      const botMessage = { text: botResponse, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <>
      {/* Chat Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-8 w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse z-50 border-4 border-white"
      >
        <span className="text-3xl">🤖</span>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-48 right-8 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <h3 className="font-semibold">Farm2Home Bot</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs p-3 rounded-2xl text-sm shadow-md ${
                  message.isBot 
                    ? 'bg-white text-gray-800 border border-gray-200' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                }`}>
                  {message.isBot && <span className="text-xs text-blue-500 font-semibold block mb-1">🤖 Bot</span>}
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;