import OrderModel from "../Model/order.model.js";
import AddressModel from "../Model/address.model.js";
import ProductModel from "../Model/product.model.js";
import CartProductModel from "../Model/cartproduct.model.js";
import { generateReadableOrderId } from "../Utils/generateId.js";
import razorpay from "../Config/razorpay.js";
import crypto from "crypto";

export async function orderController(req, res) {
    try {
        const userId = req?.userId;
        const payload = req?.body;

        const { delivery_address } = payload;
        const { payment_method } = payload;

        if (!payload || !payment_method) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Provide all the required fields"
            });
        };

        const userAddress = await AddressModel.findOne({ user: userId });

        if (!userAddress) {
            return res.status(404).json({
                message: "No address found.",
                error: false,
                success: true
            });
        };

        const ORDER_ADDRESS = userAddress?.address?.find((add) => {
            return add?._id.toString() === delivery_address;
        });

        if (!ORDER_ADDRESS) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid delivery address"
            });
        }

        let cartItem = await CartProductModel.findOne({ user: userId });

        if (!cartItem || !cartItem.items?.length) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Cart is empty"
            });
        }

        const productIdsAndQuantity = new Map(
            cartItem?.items?.map(item => [
                item.productId.toString(),
                { productId: item.productId.toString(), quantity: item.quantity }
            ])
        );

        const productIds = Array.from(productIdsAndQuantity.keys());

        const ORDERED_PRODUCTS = [];

        const allProductDetails = await ProductModel.find(
            { _id: { $in: productIds } },
            {
                name: 1,
                price: 1,
                discount: 1,
                image: { $slice: 1 }
            });

        for (let product of allProductDetails) {

            let PRODUCT_DETAIL = {
                _id: product?._id,
                name: product?.name,
                image: product?.image[0],
                price: product?.finalPrice,
            };

            const PRODUCT_QUANTITY = productIdsAndQuantity.get(product?._id.toString())?.quantity;
            const PRODUCT_TOTAL_PRICE = (product?.finalPrice * PRODUCT_QUANTITY);
            PRODUCT_DETAIL.totalPrice = PRODUCT_TOTAL_PRICE;
            PRODUCT_DETAIL.quantity = PRODUCT_QUANTITY;

            ORDERED_PRODUCTS.push(PRODUCT_DETAIL);
        };

        const ORDER_TOTAL = ORDERED_PRODUCTS.reduce(
            (sum, p) => sum + p.totalPrice,
            0
        );

        if (payment_method === "COD") {

            const ORDER_DATA = {
                userId,
                orderId: generateReadableOrderId(),
                products: ORDERED_PRODUCTS,
                delivery_address: ORDER_ADDRESS,
                order_status: "PLACED",
                totalAmt: ORDER_TOTAL,
                orderType: "COD"
            };

            const createCodOrder = await OrderModel.create(ORDER_DATA);

            if (createCodOrder) {

                await CartProductModel.deleteOne({ user: userId });

                return res.status(201).json({
                    success: true,
                    error: false,
                    message: "Order placed successfully",
                });
            };

            return res.status(400).json({
                message: "Can't place the order currently",
                error: true,
                success: false,
            });

        };

        if (payment_method == "ONLINE") {

            const options = {
                amount: Number(ORDER_TOTAL * 100),
                currency: "INR",
            };

            const ORDER_BY_RAZORPAY = await razorpay?.orders?.create(options);

            const ORDER_DATA = {
                userId,
                orderId: ORDER_BY_RAZORPAY.id,
                products: ORDERED_PRODUCTS,
                payment_status: "PENDING",
                delivery_address: ORDER_ADDRESS,
                order_status: "PENDING",
                totalAmt: ORDER_TOTAL,
                orderType: "ONLINE"
            };

            const createPendingOnlinePaymentOrder = await OrderModel.create(ORDER_DATA);

            res.status(200).json({
                error: false,
                success: true,
                api_key: process.env.RAZORPAY_KEY_ID,
                ORDER: ORDER_BY_RAZORPAY
            })


        }


    } catch (error) {
        console.log("👉👉👉👉👉👉👉👉👉👉👉👉👉", error.message);

        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    };
};

export async function verifyPaymentController(req, res) {
    try {
        const userId = req?.userId;

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req?.body;

        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing payment details"
            });
        }

        const body = (razorpay_order_id + "|" + razorpay_payment_id);

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({ success: true });
        }

        return res.status(400).json({ success: false });


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    };
}