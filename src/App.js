import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Post from "./components/Post";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch();
    const userToken = localStorage.getItem("userToken");
    useEffect(() => {
        dispatch({ type: "auth/isLoggedIn" });

        if (userToken) {
            dispatch(fetchUser(userToken));
        }
        //eslint-disable-next-line
    }, []);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/post" element={<Post />}></Route>
                <Route path="*" element={<p>404 not found !</p>}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
