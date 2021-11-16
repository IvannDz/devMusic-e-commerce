import React from "react";
import { Route, Switch} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import ProductsGrid from "./components/ProductsGrid";
import CategoryGrid from "./components/CategoryGrid";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AddProductForm from "./components/AddProductForm";
import AddAdminUser from "./components/AddAdminUser"
import Cart from "./components/Cart";
import CardProduct from "./components/CardProduct";
import { setUser } from "./state/userReducer";
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
        <Route exact path="/products/:id">
          <CardProduct />
        </Route>
        <Route path="/category/:category">
          <CategoryGrid />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/orders">
          <Orders/>
        </Route>
        <Route exact path="/admin">
          <AddProductForm />
        </Route>
        <Route path="/checkout">
          <Checkout/>
        </Route>
        <Route path="/admin/user">
          <AddAdminUser/>
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
