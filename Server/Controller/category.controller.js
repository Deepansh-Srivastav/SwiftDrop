import CategoryModel from "../Model/category.model.js";

// Add Category Controller
export async function addCategoryController(req, res) {
    try {

        const {name, image} = req.body;

        if(!name || !image){
            res.status(400).json({
                success:false,
                error:true,
                message:"Provide both name and image."
            })
        }

        const payload = {
            name,
            image
        };

        const saveNewCategory = await CategoryModel.create(payload);

        if(!saveNewCategory){
            return res.status(500).json({
                message:"Cant Save this category",
                success:false,
                error:true
            })
        }

        return res.status(200).json({
            success:true,
            error:false,
            message:"Category saved successfully."
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
};