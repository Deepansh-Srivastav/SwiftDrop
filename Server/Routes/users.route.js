import { Router } from "express";
import upload from "../Middleware/multer.js";
import {
    registerUserController,
    userEmailVerificationController,
    loginController,
    logoutController,
    uploadAvatarController,
    updateUserDetailsController,

} from "../Controller/user.controller.js";
import auth from "../Middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", userEmailVerificationController);
userRouter.post("/login", loginController);
userRouter.get('/logout', auth, logoutController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);
userRouter.patch("/update-user", auth, updateUserDetailsController)

export default userRouter;