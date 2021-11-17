import {
    createAction,
    createReducer,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";

  export const getProducts = createAsyncThunk("GET_PRODUCTS", () => {
    return axios.get("http://localhost:4747/api/products").then((res) => { console.log(res.data)
        return res.data});
  });
  

  export const setProducts = createAction("SET_PRODUCTS");

  const productsReducer = createReducer(
    [],
    {
      [setProducts]: (state, action) => (state = action.payload),
      [getProducts.fulfilled]: (state, action) => (state = action.payload),

    }
  );

  export default productsReducer;
