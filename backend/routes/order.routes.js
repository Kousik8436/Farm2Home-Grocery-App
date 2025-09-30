import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, completePayment } from "../controllers/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.post("/cod", authUser, placeOrderCOD);
router.post("/stripe", authUser, placeOrderStripe);
router.post("/complete-payment", authUser, completePayment);
router.get("/user", authUser, getUserOrders);
router.get("/seller", authSeller, getAllOrders);

export default router;