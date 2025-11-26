import { configureStore } from '@reduxjs/toolkit'
import otpVerificationReducer from './Features/OtpVerificationSlice'
import userDetailsReducer from "./Features/UserDetailsSlice"
import categoryDetailsReducer from "./Features/CategoryDetailsSlice";
import subCategoryDetailsSlice from "./Features/SubCategoryDetailsSlice";
import globalCategoryDetailsSlice from "./Features/GlobalCategorySlice";

export const store = configureStore({
    reducer: {
        isOtpVerified: otpVerificationReducer,
        userDetails: userDetailsReducer,
        categoryDetails: categoryDetailsReducer,
        subCategoryDetails: subCategoryDetailsSlice,
        globalCategoryDetails: globalCategoryDetailsSlice,
    },
    devTools: import.meta.env.MODE !== 'production',
});