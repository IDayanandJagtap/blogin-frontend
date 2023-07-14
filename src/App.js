import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import Header from "./components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />}></Route>
          <Route path={'/cart'} element={<Cart />}></Route>
          <Route path={"*"} element={<>404 <br /> Page not found</>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
