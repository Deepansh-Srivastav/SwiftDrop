import ProductModel from "../Model/product.model.js"

// Escape regex special chars so user input can't break the regex
function escapeRegex(text = "") {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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
};

// Get All Products with Limit
export async function getAllProductsController(req, res) {
    try {

        const pageNumber = Math.max(1, (Math.min(Number(req?.query?.page) || 1, 50)));

        const pageDataLimit = Math.max(5, (Math.min((Number(req?.query?.limit)) || 5, 50)))

        const skipNumberOfItems = (pageNumber - 1) * pageDataLimit;

        const item = await ProductModel.find().skip(skipNumberOfItems).limit(pageDataLimit);

        const totalItem = await ProductModel.countDocuments();

        const totalPages = Math.ceil(totalItem / pageDataLimit);

        return res.status(200).json({
            message: "Products Fetched successfully",
            error: false,
            success: true,
            data: item,
            totalPages: totalPages
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error Occurred !! ",
            error: true,
            success: false,
        })
    };
};