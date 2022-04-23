import { createSlice } from "@reduxjs/toolkit";
import { set, ref } from "firebase/database";

import { database } from "../firebase";
const configSlice = createSlice({
    name: "config",
    initialState: null,
    reducers: {
        saveConfig(state, action) {
            return action.payload;
        },
        resetConfig(state) {
            state = null;
        },
    },
});
export const configSliceActions = configSlice.actions;
export const saveConfigToDatabase = (config) => {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        set(ref(database, `${user.uid}/config`), {
            ...config,
        });
        dispatch(configSliceActions.saveConfig(config));
    };
};
export default configSlice;
