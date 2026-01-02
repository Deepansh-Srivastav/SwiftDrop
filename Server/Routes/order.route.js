import { Router } from "express";
import { orderController, verifyPayment } from "../Controller/order.controller.js";
import auth from "../Middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.post("/", auth, orderController);
orderRouter.post("/verify-payment", auth, verifyPayment);

export default orderRouter;