import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userInfo: {
            isLoggedIn: false,
        },
    },
    reducers: {
        isLoggedIn: (state, action) => {
            if (!state.userInfo.isLoggedIn) {
                const cookie = document.cookie;
                let userId = cookie.split(";");
                userId = userId.find((e) => {
                    if (e.contains("userId")) {
                        return e;
                    }
                    return null;
                });

                if (userId === null) {
                    state.userInfo.isLoggedIn = false;
                } else {
                    state.userInfo.isLoggedIn = true;
                }
            }
        },
        login: (state, action) => {
            if (!state.userInfo.isLoggedIn) {
                const userId = 10;
                const userName = "DJ";
                const posts = 10;

                state.userInfo = {
                    userId: userId,
                    userName: userName,
                    posts: posts,
                    isLoggedIn: true,
                };
                let expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7);
                expirationDate = expirationDate.toUTCString();
                document.cookie = `userId=${userId}; expires=${expirationDate};`;
                console.log(document.cookie);
            }
        },

        logout: (state, action) => {
            let expireNow = new Date();
            expireNow = expireNow.toUTCString();
            document.cookie = `userId=; expires=${expireNow}`;
            state.userInfo = { isLoggedIn: false };
        },
    },
});

export const { isLoggedIn, login, logout } = authSlice.actions;

export default authSlice.reducer;
