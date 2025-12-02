import { Router } from "express";
import { createCartProductController } from "../Controller/cartController.js";
import auth from "../Middleware/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/create-cart-item", auth, createCartProductController);

export default cartRouter;