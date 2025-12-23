import OrderModel from "../Model/order.model.js";

export function codOrdersController(req, res) {
    try {
        const userId = req?.userId;
    } catch (error) {
        console.error("Cant place order - ", error);
        return res.status(500).json({
            message: error.message || "Can't place order",
            error: true,
            success: false,
        });
    };
};