import React,{useEffect} from "react";
import fakeProducts from "../utils/fakeData";
import Card from "./Card";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {getProducts,setProducts} from "../state/productsReducer"


const ProductsGrid = () => {
  const products= useSelector((state)=>state.products);
  console.log('PRODUCTOS',products)
  const dispatch= useDispatch();
  
  useEffect(() =>{
    dispatch(getProducts())
  },[])
  

  return (
    <div className="container">
      {products.map((instrument, i) => (
        <div w="100%" h="5" bg="blue">
          <Card key={i} {...instrument} />
        </div>
      ))} 
    </div>
  );
};

export default ProductsGrid;
