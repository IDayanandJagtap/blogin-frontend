import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks to post and load data :
export const savePostToDb = createAsyncThunk(
    "post/savePostToDb",
    async (data, thunkAPI) => {
        // Fetch or axios request !
    }
);

const postSlice = createSlice({
    name: "post",
    initialState: {},
    reducers: {},
});

export default postSlice.reducer;
