import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { addCategoryController, getAllCategoryController, editCategoryController, deleteCategoryController } from "../Controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategoryController);
categoryRouter.get("/get-all-category", auth, getAllCategoryController);
categoryRouter.patch("/update-category", auth, editCategoryController);
categoryRouter.delete("/delete-category", auth, deleteCategoryController);

export default categoryRouter;