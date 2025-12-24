import axios from "axios";
import { getBaseUrl } from "./ApiConfig";
import { APIConfig } from "./ApiConfig";

const BASE_URL = getBaseUrl();

function logoutUser() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/auth/log-in";
}


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

        if (err.response?.status === 409 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {

                await Axios.post(APIConfig.userApiPath.refreshAccessToken);


                return Axios(originalRequest);
            } catch (refreshError) {

                console.log("Catch block ran");
                if (refreshError.response?.status === 498) {
                    logoutUser();
                }
                return Promise.reject(refreshError);
            };
        };

        return Promise.reject(err);
    }
);

export default Axios;