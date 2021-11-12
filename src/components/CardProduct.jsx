import React,{ useEffect} from "react";
import { chakra, Box, Flex, useColorModeValue, Link, Image } from "@chakra-ui/react";
import fakeProd from "../utils/fakeProd"
import { useSelector, useDispatch } from "react-redux";
import {getProducts,setProducts} from "../state/productsReducer";
import { useParams } from "react-router-dom";

const Ma = () => {
  const { id } = useParams();
  
  const products= useSelector((state)=>state.products);
  const producto = products.filter(productos=>productos.id.toString()===id)
  const product = producto[0]
  console.log("PRODUCTO",product)
  const dispatch= useDispatch();
  
  
  useEffect(() =>{
    dispatch(getProducts())
  },[])
  
const {name,description,price,image,stock}=fakeProd

  return (
    <Flex
      bg="#F9FAFB"
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      {product?.id? (
        <Box
        bg="white"
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
        <Image
            rounded={"lg"}
            height="full"
            width="full"
            objectFit={"cover"}
            src={product.photo}
          />
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color="gray.800"
            fontWeight="bold"
          >
            {product.name}
            
          </chakra.h2>
          <chakra.p mt={4} color="gray.600">
            {product.description}
          </chakra.p>
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            {product.price}
          </chakra.h1>
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            Stock: {product.stock}
          </chakra.h1>

          <Box mt={8}>
            <Link
              
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
              Add to Cart
            </Link>
          </Box>
            
        </Box>
        
      </Box>
      ):
      (
        <Box
        bg="white"
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
        <Image
            rounded={"lg"}
            height="full"
            width="full"
            objectFit={"cover"}
            src={image}
          />
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color="gray.800"
            fontWeight="bold"
          >
           not
            
          </chakra.h2>
          <chakra.p mt={4} color="gray.600">
          not
          </chakra.p>
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            not
          </chakra.h1>
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            Stock: not
          </chakra.h1>

          <Box mt={8}>
            <Link
              
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
              Add to Cart
            </Link>
          </Box>
            
        </Box>
        
      </Box>
      )}
    </Flex>
  );
};

export default Ma;