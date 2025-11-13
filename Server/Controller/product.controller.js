import ProductModel from "../Model/product.model.js"

// Create Product Controller
export async function createProductController(req, res) {
    try {
        const {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        } = req.body

        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description) {
            return res.status(400).json({
                message: "Enter all the required fields",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        }

        const createProduct = await ProductModel.create(payload);

        if (!createProduct) {
            return res.status(400).json({
                message: "Failed to create product.",
                error: true,
                success: false
            });
        };

        return res.status(200).json({
            message: "Product created successfully.",
            error: false,
            success: true
        })

    }

    catch (error) {
        return res.status(500).json({
            message: error.message || "Error Occurred !! ",
            error: true,
            success: false,
        })
    }
} 