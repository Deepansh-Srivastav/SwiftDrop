import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const globalCategoryDetailsSlice = createSlice({
    name: "categoryDetails",
    initialState,
    reducers: {
        setGlobalCategoryDetails: (state, action) => {
            const data = action?.payload;
            state.push(...data);
        },
        clearGlobalCategoryDetails: (state) => {
            return state = [];
        }
    }
});


export const { setGlobalCategoryDetails, clearGlobalCategoryDetails } = globalCategoryDetailsSlice.actions;

export default globalCategoryDetailsSlice.reducer;