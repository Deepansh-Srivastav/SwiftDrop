import { Router } from "express";
import { addAddressController, getAddressController } from "../Controller/address.controller.js";
import auth from "../Middleware/authMiddleware.js";

const addressRouter = Router();

addressRouter.post("/add-address", auth, addAddressController);
addressRouter.get("/get-user-address", auth, getAddressController);

export default addressRouter;