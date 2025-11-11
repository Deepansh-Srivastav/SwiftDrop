import { configureStore } from '@reduxjs/toolkit'
import otpVerificationReducer from './Features/OtpVerificationSlice'
import userDetailsReducer from "./Features/UserDetailsSlice"
import categoryDetailsReducer from "./Features/CategoryDetailsSlice";

export const store = configureStore({
    reducer: {
        isOtpVerified: otpVerificationReducer,
        userDetails: userDetailsReducer,
        categoryDetails: categoryDetailsReducer,
    },
    devTools: import.meta.env.MODE !== 'production',

})