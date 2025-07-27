import { Router } from "express";
import upload from "../Middleware/multer.js";
import auth from "../Middleware/authMiddleware.js";

import { uploadImageController } from "../Controller/uploadImage.controller.js";

const uploadImageRouter = Router();

uploadImageRouter.post("/upload-image", auth, upload.single("image"), uploadImageController);

export default uploadImageRouter;