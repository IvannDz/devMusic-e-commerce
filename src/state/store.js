import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // el logger es un middleware que usamos para ver cosas en consola
    reducer: {
      user: userReducer,
    },
  });
  
  export default store;
  