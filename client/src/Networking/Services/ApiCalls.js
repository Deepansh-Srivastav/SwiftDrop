import axios from 'axios';

export async function postApiRequestWrapper(URL, payload) {

    try {
        const response = await axios.post(URL, payload, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        })

        return response?.data
    }
    catch (error) {
        return error.response.data
    }
}


export async function getApiRequestWrapper(URL) {

    try {
        const response = await axios.get(URL)
        return response?.data
    }
    catch (error) {
        return error?.response.data
    }
}

export async function putApiRequestWrapper(URL) {

    try {
        const response = await axios.put(URL)
        return response?.data
    }
    catch (error) {
        return error?.response.data
    }
}