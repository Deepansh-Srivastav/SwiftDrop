import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const userDetailsSlice = createSlice({
    name: "userdetails",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            const data = action?.payload

            return { ...state, ...data };
        }

    }
})

export const { setUserDetails } = userDetailsSlice.actions
export default userDetailsSlice.reducer