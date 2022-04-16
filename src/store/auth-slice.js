import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
        },
        logout(state) {
            state.user = {};
        },
    },
});
export const authSliceActions = authSlice.actions;
export const createUser = (user) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: user.username,
                })
                    .then(() => {
                        dispatch(
                            authSliceActions.login({
                                user: userCredential.user,
                            })
                        );
                    })
                    .catch((error) => {});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
};
export const loginUser = (user) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                dispatch(authSliceActions.login({ user: userCredential.user }));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
};
export default authSlice;
