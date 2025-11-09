import axios from "axios";
import { getBaseUrl } from "./ApiConfig";
import { APIConfig } from "./ApiConfig";

const BASE_URL = getBaseUrl();

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    
});

// Automatic refresh token logic
Axios.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await Axios.post(APIConfig.apiPath.refreshAccessToken);
                return Axios(originalRequest);
            } catch (refreshError) {
                // window.location.href = "/";
                return Promise.reject(refreshError);
            };
        };

        return Promise.reject(err);
    }
);

export default Axios;