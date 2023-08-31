import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks to post and load data :
export const savePostToDb = createAsyncThunk(
    "post/savePostToDb",
    async (data, thunkAPI) => {
        // Fetch or axios request !
        try {
            const response = await axios.post(
                "http://localhost:8000/api/newpost",
                {
                    title: data.title,
                    description: data.description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": data.userToken,
                    },
                }
            );

            return response;
        } catch (err) {
            throw new Error(err);
        }
    }
);

const postSlice = createSlice({
    name: "post",
    initialState: {},
    reducers: {},
});

export default postSlice.reducer;
