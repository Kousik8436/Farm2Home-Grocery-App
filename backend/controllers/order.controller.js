import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import Stripe from 'stripe';

// Mock Stripe for demo - no real API key needed
const stripe = {
  paymentIntents: {
    create: async (params) => ({
      client_secret: `pi_test_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`
    })
  }
};

//Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try{
        const userId = req.user;
        const { items, address, amount } = req.body;
        if(!items || !address){
            return res.status(400).json({message: "All fields are required", success: false});
        }
        await Order.create({ userId, items, address, amount, paymentType: "COD", isPaid: false});
        res.status(201).json({message: "Order placed successfully", success: true});
    }catch(error){
        console.log("Error placing order:", error);
        res.status(500).json({message: "Internal server Error"});
    }
};

//Place Order Online Payment (Stripe): /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try{
        const userId = req.user;
        const { items, address, amount } = req.body;
        
        if(!items || !address){
            return res.status(400).json({message: "All fields are required", success: false});
        }

        // Calculate total amount
        let totalAmount = 0;
        for(const item of items) {
            const product = await Product.findById(item.product);
            if(!product) {
                return res.status(400).json({message: "Product not found", success: false});
            }
            totalAmount += product.offerPrice * item.quantity;
        }

        // Create order with payment pending
        const order = await Order.create({ 
            userId, 
            items, 
            address, 
            amount: totalAmount, 
            paymentType: "Online", 
            isPaid: false
        });

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                orderId: order._id.toString()
            }
        });

        res.status(201).json({
            message: "Payment session created", 
            success: true, 
            orderId: order._id,
            amount: totalAmount,
            clientSecret: paymentIntent.client_secret
        });
        
    } catch(error) {
        console.log("Payment Error:", error.message);
        res.status(500).json({
            message: error.message || "Internal server Error", 
            success: false
        });
    }
};

//Complete Payment (Stripe): /api/order/complete-payment
export const completePayment = async (req, res) => {
    try{
        const { orderId, paymentIntentId } = req.body;
        
        if(!orderId){
            return res.status(400).json({message: "Order ID is required", success: false});
        }

        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(400).json({message: "Order not found", success: false});
        }

        // Update order as paid
        await Order.findByIdAndUpdate(orderId, { isPaid: true });

        res.status(200).json({
            message: "Payment completed successfully!", 
            success: true
        });
        
    } catch(error) {
        console.log("Payment completion error:", error.message);
        res.status(500).json({
            message: "Payment failed", 
            success: false
        });
    }
};


//order details for individual user : /api/order/user
export const getUserOrders = async(req, res) => {
    try{
        const userId = req.user;
        const orders = await Order.find({userId, $or: [{paymentType: "COD"}, {isPaid: true}],
        }).populate("items.product address").sort({ createdAt: -1 });
        
        res.status(200).json({orders, success: true});
    }catch(error){
        console.log("Error getting user orders:", error);
        res.status(500).json({message: "Internal server Error"});
    }
};

//get all orders for admin : /api/order/seller
export const getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find({$or: [{paymentType: "COD"}, {isPaid: false}],
        }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({orders, success: true});
    }catch(error){
        console.log("Error getting all orders:", error);
        res.status(500).json({message: "Internal server Error"});
    }
};