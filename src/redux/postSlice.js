import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks to post and load data :
export const savePostToDb = createAsyncThunk(
    "post/savePostToDb",
    async (data, thunkAPI) => {
        // Fetch or axios request !
        try {
            const response = await axios.post(
                // "http://localhost:8000/api/newpost",
                "https://blogin-kpp7.onrender.com/api/newpost",
                {
                    title: data.title,
                    description: data.description,
                    createdAt: Date.now(),
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

export const getPosts = createAsyncThunk(
    "post/getPosts",
    async (data, thunkAPI) => {
        try {
            // const response = await axios.get(
            //     `http://localhost:8000/api/posts?page=${data.pageno}`
            // );
            const response = await axios.get(
                `https://blogin-kpp7.onrender.com/api/posts?page=${data.pageno}`
            );

            thunkAPI.dispatch(setPosts(response.data.payload));
            return response.data.payload;
        } catch (err) {
            throw new Error(err);
        }
    }
);

export const getSinglePost = createAsyncThunk(
    "posts/getSinglePost",
    async (data, thunkAPI) => {
        try {
            const response = await axios.get(
                `https://blogin-kpp7.onrender.com/api/view-post/${data.id}`
                // `http://localhost:8000/api/view-post/${data.id}`
            );
            return response.data.payload;
        } catch (err) {
            throw new Error(err.message);
        }
    }
);

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        myPosts: [],
        pageNo: 1,
        status: {
            isAllPostLoading: false,
        },
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.status.isAllPostLoading = false;
        },
        setPageNo: (state, action) => {
            if (action.payload === "increment") state.pageNo++;
            else if (action.payload === "decrement") state.pageNo--;
            else state.pageNo = 1;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setPosts, setPageNo, setStatus } = postSlice.actions;

export default postSlice.reducer;
