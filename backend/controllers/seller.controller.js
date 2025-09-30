import jwt from "jsonwebtoken";

// Seller login : /api/seller/login
export const sellerLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.cookie("sellerToken", token, {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({message: "Login successfully", success: true});
            
        }else{
            res.status(400).json({message:"Invalid credentials", success: false});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"Error in logging in seller"})
    }
};

//logout seller : /api/seller/logout

export const sellerLogout = async(req, res)=>{
    try {
        res.clearCookie("sellerToken", {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",});
        res.json({
            message:"logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error in logging out seller"})
    }
};

//check auth seller : /api/seller/is-auth

export const isAuthSeller = (req, res)=>{
    try {
        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.log("Authentication",error);
        res.status(500).json({message:"Error in authenticating seller"})
    }
};