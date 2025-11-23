import CategoryModel from "../Model/category.model.js";
import SubCategoryModel from "../Model/subcategory.model.js";
import ProductModel from "../Model/product.model.js";

// Add Category Controller
export async function addCategoryController(req, res) {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({
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
export async function getAllCategoryController(req, res) {
    try {

        const AllCategoryItems = await CategoryModel.find();

        return res.status(200).json({
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

//Edit Category Controller
export async function editCategoryController(req, res) {
    try {

        const { _id, name, image, secondaryImage, banner } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category ID is required."
            });
        }

        if (!name && !image && !secondaryImage && !banner) {
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
        if (secondaryImage) updateData.secondaryImage = secondaryImage;
        if (banner) updateData.banner = banner;

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

//Delete Category Controller
export async function deleteCategoryController(req, res) {
    try {

        const { _id } = req.body;

        const checkSubCategory = await SubCategoryModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments();

        const checkProduct = await ProductModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments();

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category already in use.",
                error: true,
                success: false
            });
        };


        const deleteCategory = await CategoryModel.findByIdAndDelete(_id);

        if (!deleteCategory) {
            return res.status(400).json({
                message: "Failed to delete this category.",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Category deleted successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};


export async function categoryPreviewController(req, res) {
    try {
        const { preview } = req?.query;

        console.log("preview recievd - ", preview);

        if (!preview) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Failed to fetch the preview."
            })
        };

        // const categoryPreview = await CategoryModel().find({}, { name: 1, secondaryImage: 1 }).limit(10);

        const categoryPreview = await CategoryModel.find({}, 'name secondaryImage')
            .limit(10)
            .lean();

        return res.status(200).json({
            error: false,
            success: true,
            data: categoryPreview
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};


export async function getCategoriesAndProductsController(req, res) {
    try {
        // ===== Parse query params =====
        const page = Math.max(1, parseInt(req.query.page || "1", 10));
        const limit = Math.max(1, parseInt(req.query.limit || "4", 10)); // categories per page
        const productsPerCategory = Math.max(1, parseInt(req.query.product || "6", 10)); // products per cat

        const skip = (page - 1) * limit;

        // ===== Category pipeline =====
        const pipeline = [
            { $skip: skip },
            { $limit: limit },

            {
                $project: {
                    name: 1,
                    banner: 1,
                    image: 1,
                    secondaryImage: 1
                }
            },

            // ===== Lookup products belonging to this category =====
            {
                $lookup: {
                    from: "products",
                    let: { catId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$$catId", "$category"] } } },
                        { $match: { publish: true } }, // only published products

                        {
                            $project: {
                                name: 1,
                                image: 1,
                                price: 1,
                                unit: 1,
                                stock: 1,
                                slug: 1
                            }
                        },

                        { $sort: { createdAt: -1 } },
                        { $limit: productsPerCategory }
                    ],
                    as: "products"
                }
            }
        ];

        const categoriesAgg = await CategoryModel.aggregate(pipeline).exec();

        // ===== Pagination meta =====
        const totalCategories = await CategoryModel.countDocuments();
        const hasMore = page * limit < totalCategories;

        const placeholderBanner = "/images/default-banner.png";

        // ===== Build final output =====
        const categories = categoriesAgg.map(cat => ({
            category_id: cat._id,
            banner: cat.banner || placeholderBanner,
            name: cat.name || "",
            data: cat.products || []
        }));

        return res.json({
            message: "Categories fetched successfully.",
            error: false,
            success: true,
            meta: {
                page,
                limit,
                productsPerCategory,
                totalCategories,
                hasMore
            },
            categories
        });

    } catch (err) {
        console.error("fetchCategories error:", err);
        return res.status(500).json({
            message: "Failed to fetch categories. Please try again.",
            error: true,
            success: false,
            categories: []
        });
    }
};
