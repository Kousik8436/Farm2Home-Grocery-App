import jwt from "jsonwebtoken";


export const authSeller=(req,res,next)=>{
    try {
        const { sellerToken } = req.cookies;
        if (!sellerToken) {
            return res.status(401).json({ message: "No token, authorization denied", success: false });
        }
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(decoded.email === process.env.SELLER_EMAIL){
            next();
        }
    } catch (error) {
        console.log("Authentication",error);
        res.status(401).json({message:"Error in authenticating user", success: false})
    }
}