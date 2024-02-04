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

// Get all posts
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

// Fetch a single post by id
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

// Get all posts of the current user:
export const getUsersPost = createAsyncThunk(
    "post/getUserPost",
    async (data, thunkAPI) => {
        try {
            const response = await axios.get(
                // "http://localhost:8000/api/newpost",
                "https://blogin-kpp7.onrender.com/api/my-posts",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": data.userToken,
                    },
                }
            );

            thunkAPI.dispatch(setUserPosts(response.data.payload));
            return response.data.payload;
        } catch (err) {
            throw new Error(err.message);
        }
    }
);

// Delete a post :
export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (data, thunkAPI) => {
        try {
            const response = await axios.delete(
                // `http://localhost:8000/api/delete/${data.id}`,
                `https://blogin-kpp7.onrender.com/api/delete/${data.id}`,
                {
                    headers: {
                        "auth-token": data.token,
                    },
                }
            );
            thunkAPI.dispatch(filterUserPosts(data.id));
            // return the state of the request : success = true | false;
            return response.data.success;
        } catch (err) {
            throw new Error(err.message);
        }
    }
);

// Search the posts :
export const searchPosts = createAsyncThunk(
    "posts/searchPosts",
    async (data, thunkAPI) => {
        try {
            const response = await axios.get(
                // `http://localhost:8000/api/search?query=${data.query}`
                `https://blogin-kpp7.onrender.com/api/search?query=${data.query}`
            );

            if (!response.data.success)
                throw new Error("Invalid search query...");

            thunkAPI.dispatch(setPostsOnSearch(response.data.payload));
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
            isAllPostsLoading: false,
            isUserPostsLoading: true,
        },
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.status.isAllPostsLoading = false;
        },
        setUserPosts: (state, action) => {
            state.myPosts = action.payload;
            state.status.isUserPostsLoading = false;
        },
        setPageNo: (state, action) => {
            if (action.payload === "increment") state.pageNo++;
            else if (action.payload === "decrement") state.pageNo--;
            else state.pageNo = 1;
        },
        setStatus: (state, action) => {
            if (action.payload.name === "userpost")
                state.status = {
                    ...state.status,
                    isUserPostsLoading: action.payload.status,
                };
            else if (action.payload.name === "allposts") {
                state.status = {
                    ...state.status,
                    isAllPostsLoading: action.payload.status,
                };
            }
        },
        filterUserPosts: (state, action) => {
            state.myPosts = state.myPosts.filter((e) => {
                return e._id !== action.payload;
            });
        },
        setPostsOnSearch: (state, action) => {
            if (!action.payload || !action.payload.length) {
                state.posts = [
                    {
                        _id: 0,
                        title: "No posts found !",
                        description: "Try searching something different!",
                    },
                ];
            } else {
                state.posts = action.payload;
            }
        },
    },
});

export const {
    setPosts,
    setUserPosts,
    setPageNo,
    setStatus,
    filterUserPosts,
    setPostsOnSearch,
} = postSlice.actions;

export default postSlice.reducer;
