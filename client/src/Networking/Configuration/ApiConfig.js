export function getBaseUrl() {
    return (
        window.location.hostname === "localhost" ?
            (import.meta.env.VITE_BACKEND_DEV_BASE_URL1)
            :
            (import.meta.env.VITE_BACKEND_PROD_BASE_URL))
}