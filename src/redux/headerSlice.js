import { createSlice } from "@reduxjs/toolkit";

export const headerReducer = createSlice({
    name: "header",
    initialState: {
        activeTab: "/",
    },
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },

        setIsloggedIn: (state, action) => {},
    },
});

export const { setActiveTab, setIsloggedIn } = headerReducer.actions;

export default headerReducer.reducer;
