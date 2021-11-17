import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const searchRequest = createAsyncThunk("SEARCH_NAME", (data) => {
  return axios.get(`/api/products/name/${data}`).then((res) => res.data);
});



const searchReducer = createReducer(
  [],
  {
    [searchRequest.fulfilled]: (state, action) => (state = action.payload),
  }
);

export default searchReducer;
