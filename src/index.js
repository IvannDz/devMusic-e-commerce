import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";

const app=(
    <BrowserRouter>
    <ChakraProvider>
        <App/>
    </ChakraProvider>
    </BrowserRouter>
)

const target= document.getElementById("root")


ReactDOM.render(app,target );
