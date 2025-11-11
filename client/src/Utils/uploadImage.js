import { APIConfig } from "../Networking/Configuration/ApiConfig";
import Axios from "../Networking/Configuration/AxiosConfig";

export async function uploadImage(image) {
    try {
        const URL = APIConfig?.uploadImageApiPath?.uploadImage;
        const formData = new FormData();
        formData.append("image", image);


        const response = await Axios.post(URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });

        console.log("RESPONSE from backend is  - ", response);


        if (response?.data?.success === true && response?.data?.error === false && response?.data?.data) {
            return response?.data?.data;
        };

        return null;

    } catch (error) {
        console.log(error);

    }
};

export async function handleImageUpload(e) {
    try {
        const file = e.target.files[0];
        if (!file) return;

        // Optional: validate file type / size
        if (!file.type.startsWith("image/")) {
            console.error("Invalid file type. Please upload an image.");
            return;
        }

        const uploadedImageData = await uploadImage(file);

        return uploadedImageData?.secure_url;
    } catch (error) {
        console.error("Image upload failed:", error.message);
    }
}
