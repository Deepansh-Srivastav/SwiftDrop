import OrderModel from "../Model/order.model.js";
import AddressModel from "../Model/address.model.js";

export async function orderController(req, res) {
    try {
        const userId = req?.userId;
        const payload = req?.body

        const allProductIds = payload?.products;
        const { delivery_address } = payload;
        const { payment_method } = payload;

        if (!payload || !allProductIds || !delivery_address || !payment_method) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Provide all the required fields"
            })
        }

        const userAddress = await AddressModel.findOne({ user: userId });

        const orderAddress = userAddress?.address?.filter((add) => {
            return add?._id.toString() === delivery_address;
        });

        console.log("orderAddress is -",orderAddress);
        

        if (!userAddress) {
            return res.status(404).json({
                message: "No address found.",
                error: false,
                success: true
            });
        };

        if (payment_method === "COD") {
            return res.status(200).json({
                message: "Testing req",
                error: false,
                success: true,
            });
        }




    } catch (error) {
        console.error("Cant place order - ", error);
        return res.status(500).json({
            message: error.message || "Can't place order",
            error: true,
            success: false,
        });
    };
};