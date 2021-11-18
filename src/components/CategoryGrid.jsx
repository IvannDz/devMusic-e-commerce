/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";

import axios from "axios";


const CategoryGrid = () => {
 
  const {category}= useParams()
  console.log("categoria param", category)
  const [productsCat, setProductsCat]=useState([])

  useEffect(() =>{
      axios
        .get(`/api/products/category/${category}`)
        .then((resp)=>resp.data)
        .then((productos)=> setProductsCat(productos))
  },[])

  return (
    <div className="container">
    {productsCat.map((instrument, i) => (
      <div w="100%" h="5" bg="blue">
        <Card key={i} {...instrument} />
      </div>
    ))} 
  </div>
  );
};

export default CategoryGrid;
