import { Router } from "express";
import upload from "../Middleware/multer.js";
import {
    registerUserController,
    userEmailVerificationController,
    loginController,
    logoutController,
    uploadAvatarController,
    updateUserDetailsController,
    forgotPasswordController,
    verifyForgotPasswordOTPController,
    resetPasswordController


} from "../Controller/user.controller.js";
import auth from "../Middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", userEmailVerificationController);
userRouter.post("/login", loginController);
userRouter.get('/logout', auth, logoutController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);
userRouter.patch("/update-user", auth, updateUserDetailsController)
userRouter.put("/forgot-password", forgotPasswordController)
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOTPController)
userRouter.put("/reset-password", resetPasswordController)

//Refresh token route remaining

export default userRouter; 