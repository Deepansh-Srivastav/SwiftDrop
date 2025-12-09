import { Router } from "express";
import { addAddressController } from "../Controller/address.controller.js";
import auth from "../Middleware/authMiddleware.js";

const addressRouter = Router();

addressRouter.post("/add-address", auth, addAddressController);

export default addressRouter;