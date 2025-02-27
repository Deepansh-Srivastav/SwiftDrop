import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const OtpVerificationslice = createSlice({
    name: 'isOtpVerified',
    initialState,
    reducers: {
        setVerificationState: (state, action) => {
            state.value = action?.payload
        },
    },
})

export const { setVerificationState } = OtpVerificationslice.actions

export default OtpVerificationslice.reducer