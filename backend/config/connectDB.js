import mongoose from "mongoose";
export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(`MongoDB connection error: ${error.message}`);
        console.log("Please make sure MongoDB is running on your system");
        process.exit(1);
    }
}