import { createReducer } from "@reduxjs/toolkit";

export const headerReducer = createReducer(
    {
        activeTab: "/",
    },
    {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },

        setIsloggedIn: (state, action) => {},
    }
);
