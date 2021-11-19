/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Switch} from "react-router-dom";
import "./App.css";
import AddAdminUsers from "./components/AddAdminUsers"
import Addcategory from "./components/AddCategory"
import ListCategories from "./components/ListCategories"
import EditCategory from "./components/EditCategory.jsx"
import ProductsList from "./components/ProductsList.jsx"
import EditProductForm from "./components/EditProductForm";
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
import Cart from "./components/Cart";
import DevsPage from "./components/DevsPage";
import CardProduct from "./components/CardProduct";
import { setUser } from "./state/userReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Search from "./components/Search"
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
        <Route path="/search/:name">
          <Search/>
        </Route>
        <Route path="/admin/users">
          <AddAdminUsers/>
        </Route>
        <Route path="/admin/categories">
          <ListCategories/>
        </Route>
        <Route exact path="/admin/category/:id">
          <EditCategory/>
        </Route>
        <Route path="/admin/add/category">
          <Addcategory/>
        </Route>
        <Route path="/admin/productslist">
          <ProductsList/>
        </Route>
        <Route path="/devs-page">
          <DevsPage/>
        </Route>
        <Route path="/admin/edit/:id">
          <EditProductForm/>
        </Route>
        <Route path="/search/:name">
          <Search/>
        </Route>
        <Route path="/admin/users">
          <AddAdminUsers/>
        </Route>
        <Route path="/admin/categories">
          <ListCategories/>
        </Route>
        <Route path="/admin/category/:id">
          <EditCategory/>
        </Route>
        <Route path="/admin/productslist">
          <ProductsList/>
        </Route>
        <Route path="/admin/edit/:id">
          <EditProductForm/>
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
