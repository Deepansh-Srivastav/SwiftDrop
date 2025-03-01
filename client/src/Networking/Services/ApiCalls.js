import axios from 'axios';
import Axios from '../Configuration/AxiosConfig';

export async function postApiRequestWrapper(URL, payload) {

    try {
        const response = await Axios.post(URL, payload);

        return response?.data
    }
    catch (error) {
        return error.response.data
    }
}

export async function getApiRequestWrapper(URL) {

    try {
        const response = await Axios.get(URL)
        return response?.data
    }
    catch (error) {
        return error?.response.data
    }
}

export async function putApiRequestWrapper(URL, payload) {
    try {
        const response = await Axios.put(URL, payload)
        return response?.data
    }
    catch (error) {
        return error?.response.data
    }
}