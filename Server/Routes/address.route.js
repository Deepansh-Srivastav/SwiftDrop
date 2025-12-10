import { Router } from "express";
import { addAddressController, getAddressController, deleteAddressController, updateAddressController } from "../Controller/address.controller.js";
import auth from "../Middleware/authMiddleware.js";

const addressRouter = Router();

addressRouter.post("/add-address", auth, addAddressController);
addressRouter.get("/get-user-address", auth, getAddressController);
addressRouter.patch("/update-user-address", auth, updateAddressController);
addressRouter.delete("/delete-user-address", auth, deleteAddressController);

export default addressRouter;