import { Router } from "express";
import { orderController } from "../Controller/order.controller.js";
import auth from "../Middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.post("/", auth, orderController);

export default orderRouter;