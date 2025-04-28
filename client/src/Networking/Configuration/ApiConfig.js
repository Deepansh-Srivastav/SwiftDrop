export function getBaseUrl() {
    return (
        window.location.hostname === "localhost" ?
            (import.meta.env.VITE_BACKEND_DEV_BASE_URL1)
            :
            (import.meta.env.VITE_BACKEND_PROD_BASE_URL))
};

export const APIConfig = {
    apiPath: {
        register: '/api/user/register',
        login: '/api/user/login',
        verifyEmail: '/api/user/verify-email',
        logout: '/api/user/logout',
        uploadAvatar: '/api/user/upload-avatar',
        editUserDetails: '/api/user/update-user',
        forgotPassword: '/api/user/forgot-password',
        verifyOtp: '/api/user/verify-forgot-password-otp',
        resetPassword: '/api/user/reset-password',
        getUserDetails: '/api/user/user-details'
    }
};