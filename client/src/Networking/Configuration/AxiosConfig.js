import axios from "axios";
import { getBaseUrl } from "./ApiConfig";

const BASE_URL = getBaseUrl()

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default Axios;

// extend the access token with the refreshtoken part left  video 2 at ( 4:36:15) to (4:47:00)
//Also the this part is left in the backend vido 1 last part