import { useState } from "react";
import CartProductModel from "../Model/cartproduct.model.js";
import ProductModel from "../Model/product.model.js";


export const createCartProductController = async (req, res) => {
    try {
        const { userId } = req;
        const { payload } = req.body

        if (!payload || payload.length === 0) {
            return res.status(200).json({
                success: false, error: true, message: "No item provided."
            })
        };

        const cartItem = await CartProductModel.findOne({ user: userId })

        

        if (!cartItem) {
            const totalBill = payload.reduce((sum, product) => {
                return sum + product?.price * product?.quantity;
            }, 0)

            await CartProductModel.create({
                user: userId,
                items: payload,
                bill: totalBill
            })
            return res.status(200).json({
                success: true,
                error: false,
                message: "Item added to cart."
            })


        };

        for (const product of payload) {
            const { productId, quantity, price } = product;

            const existingCartItem = cartItem?.items?.find((item) => {
                return item?.productId.toString() === productId
            })

            if (existingCartItem) {

                existingCartItem.quantity += 1;
            }
            else {
                cartItem?.items.push({ productId, quantity, price })
            }

        }


        cartItem.bill = cartItem.items.reduce((sum, item) => {
            return sum + item?.price * item?.quantity;
        }, 0)

        console.log(`The bill is = ${cartItem.bill}`);


        await cartItem.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Item added successfully."
        });

    } catch (err) {
        console.error("Cart upsert error:", err.message);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};
