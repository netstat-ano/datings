import { createSlice } from "@reduxjs/toolkit";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const uiSlice = createSlice({
    name: "ui",
    initialState: {
        pictures: null,
    },
    reducers: {
        replacePictures(state, action) {
            return { pictures: action.payload };
        },
    },
});

export const uiSliceActions = uiSlice.actions;
export const fetchPictures = () => {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        getDownloadURL(ref(storage, `${user.uid}/pictures`)).then((url) => {
            dispatch(uiSliceActions.replacePictures(url));
        });
    };
};
export default uiSlice;
