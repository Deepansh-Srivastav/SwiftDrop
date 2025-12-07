import CartProductModel from "../Model/cartproduct.model.js";
import ProductModel from "../Model/product.model.js";

// Create Cart Controller
export const createCartProductController = async (req, res) => {
    try {
        const { userId } = req;
        const { payload } = req.body

        if (!payload || payload.length === 0) {
            return res.status(400).json({
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

// Fetch all Cart Items
export const getAllCartProductsController = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "User not authenticated"
            })
        }


        let cartItem = await CartProductModel.findOne({ user: userId });

        if (!cartItem) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Empty user cart."
            })
        }


        const productIds = cartItem?.items?.map((item) => {
            return item?.productId.toString();
        })

        const cartProductDetails = await ProductModel.find({ _id: { $in: productIds } }, { name: 1, image: { $slice: 1 }, unit: 1, discount: 1, price: 1 })

        const productMap = new Map(
            cartProductDetails.map(product => [product._id.toString(), product])
        );

        const mergedItems = cartItem?.items?.map((item) => {
            const product = productMap.get(item?.productId.toString());
            const { name, image, unit, price, discount, finalPrice, } = product;
            return {
                ...item._doc,
                name,
                image,
                unit,
                price,
                discount,
                finalPrice,
            }
        })


        return res.status(200).json({
            error: false,
            success: true,
            cart: {
                ...cartItem._doc,
                items: mergedItems
            }
        })

    } catch (error) {
        console.error("Cant fetch items", error);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};

// Update cart product.
export const updateCartItemController = async (req, res) => {
    try {

        const userId = req.userId;
        const { productId, quantity } = req?.body;

        const q = Number(quantity);

        if (!productId || !Number.isInteger(q) || q < 1) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Invalid productId or quantity"
            });
        };

        const cart = await CartProductModel.findOne({ user: userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        let found = false;
        cart.items = cart.items.map(item => {
            if (item.productId.toString() === productId) {
                item.quantity = q;
                found = true;
            }
            return item;
        });

        if (!found) return res.status(404).json({ success: false, message: "Item not found in cart" });

        cart.bill = cart.items.reduce((s, it) => s + (it.quantity * it.price), 0);

        await cart.save();

        return res.status(200).json({
            error: false,
            success: true,
            message: "Item's quantity updated successfully."
        });



    } catch (error) {
        console.error("Cant update items", error);
        return res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
    }
};