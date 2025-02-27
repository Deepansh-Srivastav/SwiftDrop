import { configureStore } from '@reduxjs/toolkit'
import otpVerificationReducer from './Features/OtpVerificationSlice'

export const store = configureStore({
    reducer: {
        isOtpVerified: otpVerificationReducer
    },
    devTools: import.meta.env.MODE !== 'production',

})