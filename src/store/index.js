import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import configSlice from "./config-slice";
import uiSlice from "./ui-slice";
import peopleSlice from "./people-slice";
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        config: configSlice.reducer,
        ui: uiSlice.reducer,
        people: peopleSlice.reducer,
    },
});
export default store;
