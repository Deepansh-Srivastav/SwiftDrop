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

Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)



export default Axios;