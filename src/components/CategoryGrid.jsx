/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { Flex, Wrap, WrapItem, Button } from "@chakra-ui/react";
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
  },[category])

  return (
    <Flex direction="column">
  <Flex direction="row">
    <Wrap spacing="10px" justify="center" mr="10px">
      {productsCat.map((instrument, i) => (
        <WrapItem key={i}>
          <Card key={i} {...instrument} />
        </WrapItem>
      ))}
    </Wrap>
  </Flex>
  </Flex>
    
  );
};

export default CategoryGrid;


// <>
// <Flex direction="column">
//   <Flex direction="row">
//     <Wrap spacing="10px" justify="center" mr="10px">
//       {products.map((instrument, i) => (
//         <WrapItem key={i}>
//           <Card key={i} {...instrument} />
//         </WrapItem>
//       ))}
//     </Wrap>
//   </Flex>
//   <Flex direction="row" mx="auto" my="50px">
//     <Button
//       variant="outline"
//       colorScheme="teal"
//       mx="20px"
//       onClick={() => console.log("1")}
//     >
//       PREV
//     </Button>
//     <Button
//       variant="outline"
//       colorScheme="teal"
//       mx="20px"
//       onClick={() => console.log("1")}
//     >
//       NEXT
//     </Button>
//   </Flex>
// </Flex>
// </>