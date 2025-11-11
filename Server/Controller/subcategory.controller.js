import SubCategoryModel from "../Model/subcategory.model.js";

export async function createSubCategoryController(req, res) {
    try {
        const { name, image, category } = req.body;

        if (!name || !image || (!category || category.length === 0)) {
            return res.status(400).send({
                message: "Provide Name, Image, Category.",
                error: false,
                success: true
            });
        };

        const payload = {
            name,
            image,
            category
        };

        const createSubCategory = await SubCategoryModel.create(payload);

        if (!createSubCategory) {
            return res.status(500).json({
                message: "Failed to create sub-category. Please try again.",
                error: true,
                success: false,
            });
        };

        return res.status(201).json({
            message: "Sub-category created successfully.",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};

export async function getAllSubCategory(req, res) {
    try {
        const allSubCategories = await SubCategoryModel.find();

        if (!allSubCategories) {
            return res.status(500).json({
                message: "Failed to fetch all sub-categories",
                error: true,
                success: false
            });
        };

        return res.status(200).json({
            message: "Successfully fetched all sub-categories",
            error: false,
            success: true,
            data: allSubCategories
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};

export async function updateSubCategory(req, res) {
    try {
        const { _id, name, image, category } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Sub-category ID is required."
            });
        };

        if (!name && !image && (!category || !category[0])) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Provide at least name, image or category to update."
            });
        };

        const fetchSubCategory = await SubCategoryModel.findById(_id);

        if (!fetchSubCategory) {
            return res.status(500).json({
                message: "Failed to fetch sub-categories details",
                error: true,
                success: false
            });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (image) updateData.image = image;
        if (category && category.length > 0) updateData.category = category;

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, { $set: updateData });

        if (!updateSubCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Sub-category not found. Update failed."
            });
        }
        return res.status(200).json({
            message: "Sub-category details Updated successfully.",
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};

export async function deleteSubCategoryController(req, res) {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).send({
                message: "Provide sub-category ID to deleted.",
                error: true,
                success: false
            });
        };

        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id);

        if (!deleteSubCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Can't delete Sub-category."
            });
        };
         
        return res.status(200).json({
            message: "Sub-category deleted successfully.",
            success: true,
            error: false,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};