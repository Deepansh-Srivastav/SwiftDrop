import { APIConfig } from "../Networking/Configuration/ApiConfig";
import { postApiRequestWrapper } from "../Networking/Services/ApiCalls";

export async function uploadImage(image) {
    try {
        const URL = APIConfig?.apiPath?.uploadImage;
        const PAYLOAD = {
            image
        }

        const response = await postApiRequestWrapper(URL, PAYLOAD)

        if (response?.success === true && response?.error === false && response?.data) {
            return response?.data;
        };

        return null;

    } catch (error) {
        console.log(error);

    }
}