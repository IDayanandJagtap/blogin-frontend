import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./headerReducer";
import { authReducers } from "./authReducers";

export default configureStore({
    reducer: {
        header: headerReducer,
        authentication: authReducers,
    },
});
