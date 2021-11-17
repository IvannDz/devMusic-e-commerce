import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getProducts,setProducts} from "../state/productsReducer"
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  Stack,
  Wrap, 
  WrapItem
} from "@chakra-ui/react";
import {Link} from "react-router-dom"

const ProductsGrid = () => {
  const products= useSelector((state)=>state.products);
 
  const dispatch= useDispatch();
  
  useEffect(() =>{
    dispatch(getProducts())
  },[])
  

  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };



  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = products.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };


  return (
    <Flex
      bg={useColorModeValue("gray.200", "gray.600")}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex pos="relative" overflow="hidden">
        <Flex h="400px" w="full" {...carouselStyle} >
       
          {products.map((prod, sid) => (
         
            <Box key={`slide-${sid}`} m={2} shadow="md" flex="none"  boxShadow="dark-lg" rounded="md" bg="white" w={{base: "100%", md:'50%', lg: "25%"}}>
              <Link to={`/products/${prod.id}`} >
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image src={prod.photo}  backgroundSize="cover" rounded={"lg"} w="100%"/>
              <Stack
                p="8px 12px"
                pos="absolute"
                bottom="26px"
                textAlign="left"
                 
                mb="8"
                color="black"
                backgroundColor="#00000040"
                w={{base: "100%", md:'50%', lg: "25%"}}
              >
                <Text fontSize={"2xl"} fontFamily={"body"} fontWeight={500} >{prod.name}</Text>
              </Stack>
            </Link>
            </Box>
         
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={() => setSlide(slide)}
            ></Box>
            
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default ProductsGrid;


