import { Router } from "express";
import auth from "../Middleware/authMiddleware.js";
import { createSubCategoryController, getAllSubCategoryController, updateSubCategoryController, deleteSubCategoryController } from "../Controller/subcategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add-sub-category", auth, createSubCategoryController);
subCategoryRouter.get("/get-all-sub-category", auth, getAllSubCategoryController);
subCategoryRouter.patch("/update-sub-category", auth, updateSubCategoryController);
subCategoryRouter.delete("/delete-sub-category", auth, deleteSubCategoryController);

export default subCategoryRouter;