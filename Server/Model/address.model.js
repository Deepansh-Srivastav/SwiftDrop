import mongoose, { Schema } from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    address: [
        {
            address_line: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                default: ""
            },
            state: {
                type: String,
                default: ""
            },
            pin: {
                type: String
            },
            country: {
                type: String
            },
            addressType: {
                type: Number,
                default: "Home"
            },
            mobile: {
                type: Number,
                default: "India"
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