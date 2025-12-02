import { Router } from "express";
import { createCartProductController, getAllCartProductsController } from "../Controller/cartController.js";
import auth from "../Middleware/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/create-cart-item", auth, createCartProductController);
cartRouter.get("/get-cart-item", auth, getAllCartProductsController);

export default cartRouter;