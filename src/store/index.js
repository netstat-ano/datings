import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import configSlice from "./config-slice";
import uiSlice from "./ui-slice";
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        config: configSlice.reducer,
        ui: uiSlice.reducer,
    },
});
export default store;
