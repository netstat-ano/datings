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
export const fetchPictures = (uid) => {
    return (dispatch) => {
        getDownloadURL(ref(storage, `${uid}/pictures`)).then((url) => {
            dispatch(uiSliceActions.replacePictures(url));
        });
    };
};
export default uiSlice;
