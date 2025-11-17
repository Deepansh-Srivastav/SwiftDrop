import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { createProductController, getAllProductsController } from "../Controller/product.controller.js"

const productRouter = Router();

productRouter.post("/add-product", auth, createProductController);
productRouter.get("/get-products", auth, getAllProductsController);

export default productRouter;