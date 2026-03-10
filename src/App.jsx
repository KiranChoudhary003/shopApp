import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./components/about";
import Contact from "./components/contact";
import Login from "./components/login";
import Products from "./components/products";
import SignUp from "./components/signUp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import UserPanel from "./pages/UserPanel";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import { AdminDashboard } from "./pages/admin";
import OrderDetails from "./pages/OrderDetails";
import { Main, Page } from "./ui/layout";

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const raw = window.localStorage.getItem("loggedInUser");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (loggedInUser) window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    else window.localStorage.removeItem("loggedInUser");
  }, [loggedInUser]);

  const headerProps = useMemo(
    () => ({ loggedInUser, setLoggedInUser }),
    [loggedInUser]
  );
  return (
    <BrowserRouter>
      <Page>
        <Header {...headerProps} />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products loggedInUser={loggedInUser} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout loggedInUser={loggedInUser} />} />
            <Route path="/account/*" element={<UserPanel loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
            <Route path="/orders/:id" element={<OrderDetails loggedInUser={loggedInUser} />} />
            <Route path="/admin" element={<AdminDashboard loggedInUser={loggedInUser} />} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </Page>
    </BrowserRouter>
  )
  
}

export default App
