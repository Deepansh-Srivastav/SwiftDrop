import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { postApiRequestWrapper } from "../Networking/Services/ApiCalls";
import Axios from "../Networking/Configuration/AxiosConfig";

export async function uploadImage(image) {
    try {
        const URL = APIConfig?.userApiPath?.uploadImage;
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
}