import { configureStore } from "@reduxjs/toolkit";
import { cartReducers } from './reducers'

export default configureStore({
    reducer: {
        cart: cartReducers
    }
})