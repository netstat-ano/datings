import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: null,
    reducers: {
        saveConfig(state, action) {
            state = action.payload;
        },
        resetConfig(state) {
            state = null;
        },
    },
});
export default configSlice;
export const configSliceActions = configSlice.actions;
