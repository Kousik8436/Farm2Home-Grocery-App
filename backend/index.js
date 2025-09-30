import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import OrderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

const app = express();
connectDB();
connectCloudinary();

const allowedOrigins =["http://localhost:5173", "http://localhost:3000"]

//middleware
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(cookieParser());
 

//Api Endpoints
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Farm2Home API is running successfully!",
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

app.get("/health", (req, res) => {
    res.json({ 
        success: true, 
        message: "Server is healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/address", addressRoutes);


const PORT=process.env.PORT || 5000;

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Promise Rejection:', err.message);
    console.log('Shutting down server...');
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});