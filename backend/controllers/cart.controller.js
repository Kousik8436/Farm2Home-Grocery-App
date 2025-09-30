import User from "../models/user.model.js";

//update user cartData: /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    if(!updatedUser){
        return res.status(404).json({
            message: "User Not found",
            success: false,
        })
    }
    res.status(200).json({ updatedUser, success: true, message: "Cart Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in updating cart" });
  }
};
