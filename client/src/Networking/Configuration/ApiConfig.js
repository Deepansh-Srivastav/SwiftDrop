export function getBaseUrl() {
    return (
        window.location.hostname === "localhost" ?
            (import.meta.env.VITE_BACKEND_DEV_BASE_URL1)
            :
            (import.meta.env.VITE_BACKEND_PROD_BASE_URL))
};

export const API_BASE = {
    api: "/api",
    user: "/api/user",
    category: "/api/category",
    subCategory: "/api/sub-category",
    product: "/api/product",
    file: "/api/file",
};

export const APIConfig = {
    userApiPath: {
        register: `${API_BASE.user}/register`,
        login: `${API_BASE.user}/login`,
        oAuth: `${API_BASE.user}/google-oauth`,
        verifyEmail: `${API_BASE.user}/verify-email`,
        logout: `${API_BASE.user}/logout`,
        uploadAvatar: `${API_BASE.user}/upload-avatar`,
        editUserDetails: `${API_BASE.user}/update-user`,
        forgotPassword: `${API_BASE.user}/forgot-password`,
        verifyOtp: `${API_BASE.user}/verify-forgot-password-otp`,
        resetPassword: `${API_BASE.user}/reset-password`,
        getUserDetails: `${API_BASE.user}/user-details`,
        refreshAccessToken: `${API_BASE.user}/refresh-token`,
    },

    categoryApiPath: {
        addCategory: `${API_BASE.category}/add-category`,
        getAllCategory: `${API_BASE.category}/get-all-category`,
        updateCategory: `${API_BASE.category}/update-category`,
        deleteCategory: `${API_BASE.category}/delete-category`,
        previewCategory: `${API_BASE.category}/category-preview`,
        getCategoryAndProducts: `${API_BASE.category}/`,
    },

    subCategoryApiPath: {
        addSubCategory: `${API_BASE.subCategory}/add-sub-category`,
        getSubCategory: `${API_BASE.subCategory}/get-all-sub-category`,
        updateSubCategory: `${API_BASE.subCategory}/update-sub-category`,
        deleteSubCategory: `${API_BASE.subCategory}/delete-sub-category`,
    },

    productPath: {
        addProduct: `${API_BASE.product}/add-product`,
        getProducts: `${API_BASE.product}/get-products`,
    },

    uploadImageApiPath: {
        uploadImage: `${API_BASE.file}/upload-image`,
    }
};
