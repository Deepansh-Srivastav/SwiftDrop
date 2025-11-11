import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { addCategoryController, getAllCategory, editCategory } from "../Controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategoryController);
categoryRouter.get("/get-all-category", auth, getAllCategory);
categoryRouter.patch("/update-category", auth, editCategory);

export default categoryRouter;