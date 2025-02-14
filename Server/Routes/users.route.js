import { Router } from "express";
import {
    registerUserController,
    userEmailVerificationController,
    loginController,
    logoutController
} from "../Controller/user.controller.js";
import auth from "../Middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", userEmailVerificationController);
userRouter.post("/login", loginController);
userRouter.get('/logout', auth, logoutController)


export default userRouter;