import uploadImageClodinary from "../Utils/uploadImageCloudinary.js"

export async function uploadImageController(req, res) {
    try {
        const file = req.file;

        console.log("Uploaded file:", file);

        const uploadImage = await uploadImageClodinary(file)

        return res.json({
            message: "Upload done",
            data: uploadImage,
            success: true,
            error: false
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    };
};