import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Post from "./components/Post";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/authSlice";
import MyPosts from "./components/MyPosts";
import AllPosts from "./components/AllPosts";
import "./styles/index.css";
import DetailedPost from "./components/DetailedPost";
import { getPosts } from "./redux/postSlice";
import { useToast } from "@chakra-ui/react";

function App() {
    const dispatch = useDispatch();
    const userToken = localStorage.getItem("userToken");
    const toast = useToast();

    useEffect(() => {
        dispatch({ type: "auth/isLoggedIn" });
        dispatch(getPosts({ pageno: 1 }));
        if (userToken) {
            dispatch(fetchUser(userToken));
        }
        toast.closeAll();
        toast({
            title: "Refresh or switch home and posts tabs",
            status: "info",
            duration: null,
            isClosable: true,
            description:
                "The backend has downtime as it is hosted on shared services! It might take some time to load the posts. If you are still unable to see the posts try checking after 3-5 mins!",
        });
        //eslint-disable-next-line
    }, []);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/post" exact element={<Post />}></Route>
                <Route path="/myposts" exact element={<MyPosts />}></Route>
                <Route path="/posts" exact element={<AllPosts />}></Route>
                <Route path="/posts/:id" element={<DetailedPost />}></Route>
                <Route
                    path="/posts/:user/:id"
                    element={<DetailedPost />}
                ></Route>
                <Route path="*" element={<p>404 not found !</p>}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
