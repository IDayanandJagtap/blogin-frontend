import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import headerReducer from "./headerSlice";

export default configureStore({
    reducer: {
        header: headerReducer,
        auth: authReducer,
    },
});
