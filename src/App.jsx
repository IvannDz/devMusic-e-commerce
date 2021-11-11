import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import ProductsGrid from "./components/ProductsGrid";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Cart from "./components/Cart";
import CardProduct from "./components/CardProduct";
import { setUser } from "./state/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function App() {


  const dispatch = useDispatch();
  //Aca hago la persistencia.
  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Banner />
          <ProductsGrid />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/products/:id">
          <CardProduct />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
