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
    resetPasswordController,
    getLoginUserDetails,
    googleOAuthController,

} from "../Controller/user.controller.js";
import auth from "../Middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", userEmailVerificationController);
userRouter.post("/login", loginController);
userRouter.patch("/update-user", auth, updateUserDetailsController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);
userRouter.put("/forgot-password", forgotPasswordController)
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOTPController)
userRouter.put("/reset-password", resetPasswordController)
userRouter.get('/logout', auth, logoutController);
userRouter.get("/user-details", auth, getLoginUserDetails)

userRouter.get("/google-oauth", googleOAuthController)

//Refresh token route remaining

export default userRouter; 