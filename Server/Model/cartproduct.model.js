import mongoose, { Schema } from "mongoose";

const cartProductSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less than 1'],
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    bill: {
        type: Number,
        required: true,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CartProductModel = mongoose.model('cartProduct', cartProductSchema)

export default CartProductModel;