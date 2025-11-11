import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { createSubCategoryController, getAllSubCategory, updateSubCategory, deleteSubCategoryController } from "../Controller/subcategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add-sub-category", auth, createSubCategoryController);
subCategoryRouter.get("/get-all-sub-category", auth, getAllSubCategory);
subCategoryRouter.patch("/update-sub-category", auth, updateSubCategory);
subCategoryRouter.delete("/delete-sub-category", auth, deleteSubCategoryController);

export default subCategoryRouter;