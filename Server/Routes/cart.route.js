import { Router } from "express";
import {
    createCartProductController,
    getAllCartProductsController,
    updateCartItemController,
    deleteCartItemController
} from "../Controller/cartController.js";
import auth from "../Middleware/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/create-cart-item", auth, createCartProductController);
cartRouter.get("/get-cart-item", auth, getAllCartProductsController);
cartRouter.patch("/update-cart-item", auth, updateCartItemController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemController);


export default cartRouter;