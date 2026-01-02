import { Router } from "express";
import { orderController, verifyPaymentController } from "../Controller/order.controller.js";
import auth from "../Middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.post("/", auth, orderController);
orderRouter.post("/verify-payment", auth, verifyPaymentController);

export default orderRouter;