import CategoryModel from "../Model/category.model.js";

// Add Category Controller
export async function addCategoryController(req, res) {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            res.status(400).json({
                success: false,
                error: true,
                message: "Provide both name and image."
            })
        }

        const payload = {
            name,
            image
        };

        const saveNewCategory = await CategoryModel.create(payload);

        if (!saveNewCategory) {
            return res.status(500).json({
                message: "Cant Save this category",
                success: false,
                error: true
            })
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Category saved successfully."
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
};

//Get all category Controller
export async function getAllCategory(req, res) {
    try {

        const AllCategoryItems = await CategoryModel.find();

        res.status(200).json({
            message: "Get category api running",
            error: false,
            success: true,
            categoryData: AllCategoryItems
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    };
};

export async function editCategory(req, res) {
    try {

        const { _id, name, image } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category ID is required."
            });
        }

        if (!name && !image) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Provide at least name or image to update."
            });
        }

        const categoryDetails = await CategoryModel?.findById(_id);

        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category not found."
            });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (image) updateData.image = image;

        const updatedCategory = await CategoryModel.findByIdAndUpdate(_id, { $set: updateData });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Category not found. Update failed."
            });
        }
        return res.status(200).json({
            message: "Category details Updated successfully.",
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    };
};