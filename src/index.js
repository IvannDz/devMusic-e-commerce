import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import store from "./state/store";
import { Provider } from "react-redux";

const app=(
    <BrowserRouter>
    <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ChakraProvider>
    </BrowserRouter>
)

const target= document.getElementById("root")


ReactDOM.render(app,target );
