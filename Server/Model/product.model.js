import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory'
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        defualt: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

productSchema.virtual("finalPrice").get(function () {
    if (!this.discount || this.discount <= 0) return this.price;
    const discounted = this.price - (this.price * this.discount) / 100;
    return Math.round(discounted); // or keep decimals if you want
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

productSchema.index({
    name: "text",
    description: 'text'
}, {
    name: 10,
    description: 5
});



const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;