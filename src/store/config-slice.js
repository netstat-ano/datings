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
const saveConfigToDatabase = () => {
    return (dispatch) => {};
};
export default configSlice;
export const configSliceActions = configSlice.actions;
