import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const subCategoryDetailsSlice = createSlice({
    name: "subCategoryDetails",
    initialState,
    reducers: {
        setSubCategoryDetails: (state, action) => {
            const data = action?.payload;
            return [...data];
        },
        clearSubCategoryDetails: (state) => {
            return state = {};
        }
    }

});

export const { setSubCategoryDetails, clearSubCategoryDetails } = subCategoryDetailsSlice.actions;

export default subCategoryDetailsSlice.reducer;