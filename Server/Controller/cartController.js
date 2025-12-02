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

        let cartItem = await CartProductModel.findOne({ user: userId })

        const productIds = payload?.map((item) => {
            return item?.productId
        })

        const existingProducts = await ProductModel?.find({ _id: { $in: productIds } }, { name: 1, price: 1, discount: 1 })

        const ProductsPriceMap = new Map(
            existingProducts?.map((product) => {
                return [product?._id.toString(), product?.finalPrice];
            })
        )

        if (!cartItem) {
            cartItem = new CartProductModel({ user: userId, items: [], bill: 0 })
        };

        for (const product of payload) {
            const { productId, quantity } = product;

            const price = ProductsPriceMap.get(productId);

            const existingCartItem = cartItem?.items?.find((item) => {
                return item?.productId.toString() === productId
            })

            if (existingCartItem) {
                existingCartItem.price = price
                existingCartItem.quantity += 1;
            }
            else {
                cartItem?.items.push({ productId, quantity, price })
            }

        }

        cartItem.bill = cartItem.items.reduce((sum, item) => {
            return sum + item?.price * item?.quantity;
        }, 0)

        await cartItem.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Item added successfully."
        });

    } catch (err) {
        console.error("Cart upsert error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};
