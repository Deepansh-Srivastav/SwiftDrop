import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { addCategoryController } from "../Controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategoryController);

export default categoryRouter;