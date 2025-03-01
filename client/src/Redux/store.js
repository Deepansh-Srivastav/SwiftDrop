import { configureStore } from '@reduxjs/toolkit'
import otpVerificationReducer from './Features/OtpVerificationSlice'
import userDetailsReducer from "./Features/UserDetailsSlice"

export const store = configureStore({
    reducer: {
        isOtpVerified: otpVerificationReducer,
        userDetails: userDetailsReducer,
    },
    devTools: import.meta.env.MODE !== 'production',

})