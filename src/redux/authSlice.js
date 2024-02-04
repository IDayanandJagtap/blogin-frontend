import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Aysnc thunks

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (userToken, thunkAPI) => {
        try {
            const { data } = await axios.get(
                // "http://localhost:8000/auth/getuser",
                "https://blogin-kpp7.onrender.com/auth/getuser",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": userToken,
                    },
                }
            );

            // Add userid(userToken to the data we are returning )
            data.userToken = userToken;
            // fetchUsers on successfull api req returns an object {success, data} ...
            // Due to axios ... the return value is stored in data ... so data.data
            thunkAPI.dispatch(setUser(data));
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData, thunkAPI) => {
        try {
            const response = await axios.post(
                // "http://localhost:8000/auth/login",
                "https://blogin-kpp7.onrender.com/auth/login",
                loginData,
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            const payload = response.data;

            await thunkAPI.dispatch(fetchUser(payload.data));

            return payload;
        } catch (err) {
            throw new Error(err.response.data.error);
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (signupData, thunkAPI) => {
        try {
            const response = await axios.post(
                // "http://localhost:8000/auth/signup",
                "https://blogin-kpp7.onrender.com/auth/signup",
                signupData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const payload = response.data;

            await thunkAPI.dispatch(fetchUser(payload.data));

            return payload;
        } catch (err) {
            throw new Error(err.response.data.error);
        }
    }
);

// Main slice
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userToken: null,
        userInfo: {
            isLoggedIn: false,
        },
    },
    reducers: {
        isLoggedIn: (state, action) => {
            if (!state.userInfo.isLoggedIn) {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    state.userInfo.isLoggedIn = false;
                } else {
                    let userData = localStorage.getItem("user");
                    userData = JSON.parse(userData);
                    state.userInfo = userData;
                    state.userInfo.isLoggedIn = true;
                }
            }
        },
        setUser: (state, action) => {
            const user = action.payload.data;
            const userToken = action.payload.userToken;

            const userData = {
                ...state.userInfo,
                id: user._id,
                name: user.name,
                email: user.email,
            };

            state.userInfo = userData;
            state.userInfo.isLoggedIn = true;
            state.userToken = userToken;
            localStorage.setItem("user", JSON.stringify(userData));
        },
        logout: (state, action) => {
            if (state.userInfo.isLoggedIn) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                state.userInfo = { isLoggedIn: false };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const token = action.payload.data;
                    state.userToken = token;
                    localStorage.setItem("userToken", token);
                }
                // We could have used another addCase(.rejected) but we want to run only a single function so it will be easy to write in else.
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const token = action.payload.data;
                    state.userToken = token;
                    localStorage.setItem("userToken", token);
                }
            });
    },
});

export const { setUser, isLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
