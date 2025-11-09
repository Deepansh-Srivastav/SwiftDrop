import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { addCategoryController, getAllCategory } from "../Controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategoryController);
categoryRouter.get("/get-all-category", auth, getAllCategory);

export default categoryRouter;