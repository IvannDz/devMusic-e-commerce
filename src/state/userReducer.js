import {
    createAction,
    createReducer,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";

  export const loginRequest = createAsyncThunk("LOGIN", (data) => {
    return axios.post("http://localhost:4747/api/auth/login", data).then((res) => res.data);
  });
  
  export const logoutRequest = createAsyncThunk("LOGOUT", () => {
    return axios.post("http://localhost:4747/api/auth/logout");
  });

  export const setUser = createAction("SET_USER");

  const userReducer = createReducer(
    {},
    {
      [setUser]: (state, action) => (state = action.payload),
      [loginRequest.fulfilled]: (state, action) => (state = action.payload),
      [logoutRequest.fulfilled]: (state, action) => (state = {}),
    }
  );

  export default userReducer;
