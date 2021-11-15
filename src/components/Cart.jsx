import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  chakra,
  Flex,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";

export default function Component() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/cart`)
      .then((resp) => {
        console.log("resp carrito", resp.data);
        return resp.data;
      })
      .then((products) => setProducts(products));
  }, []);

  const data = products;

  // const handleDelete = () => {
  //   axios
  //     .delete(`/api/cart`,{idProduct:products.id, price:products.price})
  //     .then((res)=>res.data)
      
  // }

  return (
    <Flex
      w="full"
      bg="gray.600"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={{ base: "column" }} w="full" bg="gray.800" shadow="lg">
        <SimpleGrid
          spacingY={3}
          columns={{ base: 1, md: 3 }}
          w={{ base: 120, md: "full" }}
          textTransform="uppercase"
          bg="gray.100"
          color="gray.500"
          py={{ base: 1, md: 4 }}
          px={{ base: 2, md: 10 }}
          fontSize="md"
          fontWeight="hairline"
          display="table-header-group"
        >
          <chakra.span textAlign={{ md: "right" }}>Product Name</chakra.span>
        </SimpleGrid>

        {data.map((product, pid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg="white"
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 3 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{product.name}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {product.price}
                </chakra.span>
                <Flex justify={{ md: "end" }}>
                  <Button 
                  variant="solid" 
                  colorScheme="red" 
                  size="sm"
               
                  onClick={()=>{  
                    axios
                    .delete(`/api/cart`,{data:{idProduct:product.id, price:product.price}})
                    .then((resp)=>resp.data)}}>
                    Delete
                  </Button>

                  <Button variant="solid" colorScheme="green" size="sm">
                    +
                  </Button>

                  <Button variant="solid" colorScheme="red" size="sm">
                    -
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}
