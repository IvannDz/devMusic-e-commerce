import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  chakra,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";
import {GrEdit, GrAdd} from 'react-icons/gr'
import {AiFillDelete} from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setProducts } from "../state/productsReducer";

export default function ProductsList() {
  const products = useSelector((state) => state.products);
  const toast= useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(products);
  return (
    <Flex
      w="full"
      bg="white"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={{ base: "column" }} w="full" bg="white" shadow="lg">
        <Flex direction={{ base: "row", md: "column" }} bg="grey">
          <SimpleGrid
            spacingY={3}
            columns={{ base: 1, md: 4 }}
            w="full"
            py={2}
            px={10}
            fontWeight="hairline"
          >
            <span>Name</span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Model
            </chakra.span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Price
            </chakra.span>
            <Link to="/admin">
            <Button
            ml={20}>Add New Product</Button>
            </Link>
          </SimpleGrid>
        </Flex>
        {products.map((product, pid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg="white"
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 4 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{product.name}</span>
                <span>{product.model}</span>

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
                    mr={2}
                    onClick={() => {
                      return axios
                        .delete(`/api/admin/product/${product.id}`)
                        .then((resp) => {
                          toast({
                            title: "Delete Success",
                            description: "Product Deleted",
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                          })
                          return resp.data})
                        .then(() => dispatch(getProducts()));
                    }}
                  >
                     <AiFillDelete/>
                  </Button>
                  <Link to={`/admin/edit/${product.id}`}>
                  <Button  variant="outline"
                        bg="gray.400"
                        size="sm"
                        mr={10}>
                  <GrEdit/>
                  </Button>
                  </Link>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}

        <Stack
          direction={{ base: "column" }}
          w="full"
          bg="gray.800"
          shadow="lg"
        >
          <Flex direction={{ base: "row", md: "column" }} bg="grey">
            <SimpleGrid
              spacingY={3}
              columns={{ base: 1, md: 4 }}
              w="full"
              py={2}
              px={10}
              fontWeight="hairline"
            ></SimpleGrid>
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  );
}