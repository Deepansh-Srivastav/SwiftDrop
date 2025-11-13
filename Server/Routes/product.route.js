import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { createProductController } from "../Controller/product.controller.js"

const productRouter = Router();

productRouter.post("/add-product", auth, createProductController);

export default productRouter;