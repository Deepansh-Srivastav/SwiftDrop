import { getApiRequestWrapper } from "../Services/ApiCalls";
import { APIConfig } from "./ApiConfig";

import { showSuccessToast } from "../../Components/CostomAlert";

export async function handleUserLogOut(handleclose = null) {


    if (handleclose) {
        handleclose();
    };

    const LOGOUT_ENDPOINT = APIConfig?.userApiPath?.logout;

    const response = await getApiRequestWrapper(LOGOUT_ENDPOINT);

    if (response?.success === true && response?.error === false) {
        localStorage.clear();
        showSuccessToast(response?.message);
        return true;
    };
    return false
}