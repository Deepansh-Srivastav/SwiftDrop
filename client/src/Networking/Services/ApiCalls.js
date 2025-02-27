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

export async function putApiRequestWrapper(URL, payload) {
    console.log('payload is ',payload);

    try {
        const response = await axios.put(URL, payload, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response?.data
    }
    catch (error) {
        return error?.response.data
    }
}