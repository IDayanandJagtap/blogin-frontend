import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import headerReducer from "./headerSlice";
import postReducer from "./postSlice";
export default configureStore({
    reducer: {
        header: headerReducer,
        auth: authReducer,
        post: postReducer,
    },
});
