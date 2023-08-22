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

    },
});

export const { setActiveTab } = headerReducer.actions;

export default headerReducer.reducer;
