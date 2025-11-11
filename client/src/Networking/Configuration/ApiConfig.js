export function getBaseUrl() {
    return (
        window.location.hostname === "localhost" ?
            (import.meta.env.VITE_BACKEND_DEV_BASE_URL1)
            :
            (import.meta.env.VITE_BACKEND_PROD_BASE_URL))
};

export const APIConfig = {
    userApiPath: {
        register: '/api/user/register',
        login: '/api/user/login',
        oAuth: '/api/user/google-oauth',
        verifyEmail: '/api/user/verify-email',
        logout: '/api/user/logout',
        uploadAvatar: '/api/user/upload-avatar',
        editUserDetails: '/api/user/update-user',
        forgotPassword: '/api/user/forgot-password',
        verifyOtp: '/api/user/verify-forgot-password-otp',
        resetPassword: '/api/user/reset-password',
        getUserDetails: '/api/user/user-details',
        refreshAccessToken: "/api/user/refresh-token",
    },

    categoryApiPath: {
        addCategory: "/api/category/add-category",
        getAllCategory: "/api/category/get-all-category",
        updateCategory: "/api/category/update-category",
    },

    subCategoryApiPath:{
        addSubCategory:"/api/sub-category/add-sub-category",
        getSubCategory: "/api/sub-category/get-all-sub-category",
        updateSubCategory:"/api/sub-category/update-sub-category",
        deleteSubCategory:"/api/sub-category/delete-sub-category",
    },

    uploadImageApiPath: {
        uploadImage: "/api/file/upload-image",
    }
};