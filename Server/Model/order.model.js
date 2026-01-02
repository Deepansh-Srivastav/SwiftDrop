import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true],
        unique: true,
        index: true
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                required: true
            },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            totalPrice: { type: Number, required: true },

        }
    ],
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
        default: "PENDING"
    },
    delivery_address: {
        receiver_name: { type: String, required: true },
        mobile: { type: String, required: true },
        address_line: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        addressType: {
            type: String,
            enum: ["Home", "Office", "Other"],
            default: "Home"
        },
        pin: { type: String, required: true }
    },
    order_status: {
        type: String,
        enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "PENDING"],
        default: "PENDING"
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    orderType: {
        type: String,
        enum: ["ONLINE", "COD"],
        required: true
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel;