import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const OtpVerificationslice = createSlice({
    name: 'isOtpVerified',
    initialState,
    reducers: {
        setOtpVerificationState: (state, action) => {
            state.value = action?.payload
        },
    },
})

export const { setOtpVerificationState } = OtpVerificationslice.actions

export default OtpVerificationslice.reducer