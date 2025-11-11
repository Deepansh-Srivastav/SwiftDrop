import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categoryDetailsSlice = createSlice({
    name: "categoryDetails",
    initialState,
    reducers: {
        setCategoryDetails: (state, action) => {
            const data = action?.payload;
            return [...data];
        },
        clearCategoryDetails: (state) => {
            return state = {}
        }
    }
});


export const { setCategoryDetails, clearCategoryDetails } = categoryDetailsSlice.actions;

export default categoryDetailsSlice.reducer;