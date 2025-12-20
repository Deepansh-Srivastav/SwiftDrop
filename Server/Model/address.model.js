import mongoose, { Schema } from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    address: [
        {
            receiver_name: {
                type: String,
                required: true
            },
            address_line: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pin: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
                default: "India"
            },
            addressType: {
                type: String,
                enum: ["Home", "Office", "Other"],
                default: "Home"
            },
            mobile: {
                type: String,
                required: true
            },
            // status: {
            //     type: Boolean,
            //     default: true
            // },
        }
    ]
}, {
    timestamps: true
})

const AddressModel = mongoose.model('address', addressSchema)

export default AddressModel