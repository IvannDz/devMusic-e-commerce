import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import {
  chakra,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";

export default function Component() {
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`/api/cart`)
      .then((resp) => {
        console.log("resp carrito completo", resp)

        return resp.data;
      })
      .then((data) => setProducts(data.products));
  }, []);

  const data = products;


  const total = products.reduce((acum, products) => { return acum = products.price * products.cantidad + acum }, 0)
  console.log("TOTALLLLL", total)


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
              Quantity
            </chakra.span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Price
            </chakra.span>

          </SimpleGrid>
        </Flex>
        {data.map((product, pid) => {
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
                <span>{product.cantidad}</span>

                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {product.price * product.cantidad}
                </chakra.span>

                <Flex justify={{ md: "end" }}>


                  <Button
                    variant="solid"
                    colorScheme="green"
                    size="sm"
                    mr={2}
                    onClick={() => {
                      return axios
                        .post(`/api/cart`, { id: product.id, price: product.price })
                        .then((resp) => {
                          toast({
                            title: "Action Success.",
                            description: "Product Added.",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                          })
                          return resp.data
                        })
                        .then(() => {
                          axios
                            .get(`/api/cart`)
                            .then((resp) => resp.data)
                            .then((data) => setProducts(data.products));
                        })


                    }

                    }
                  >
                    +
                  </Button>

                  <Button
                    variant="solid"
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      axios
                        .delete(`/api/cart`, { data: { idProduct: product.id, price: product.price } })
                        .then((resp) => {
                          toast({
                            title: "Action Success.",
                            description: "Product deleted.",
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                          })
                          return resp.data
                        })
                        .then(() => {
                          axios
                            .get(`/api/cart`)
                            .then((resp) => resp.data)
                            .then((data) => setProducts(data.products));
                        })
                    }

                    }>
                    -
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}


        <Stack direction={{ base: "column" }} w="full" bg="gray.800" shadow="lg">
          <Flex direction={{ base: "row", md: "column" }} bg="grey">
            <SimpleGrid
              spacingY={3}
              columns={{ base: 1, md: 4 }}
              w="full"
              py={2}
              px={10}
              fontWeight="hairline"
            >
              <span>{`Total: $${total}`}</span>

              <Link to="/checkout">
                <Button

                  variant="solid"
                  colorScheme="green"
                  size="sm"
                  onClick={() => {
                    axios
                      .put(`/api/cart/buy`)
                      .then((resp) => {
                        toast({
                          title: "Purchase Success.",
                          description: "Check your mail for confirmation.",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        })
                        return resp.data
                      })

                  }

                  }>
                  Buy
                </Button>
              </Link>

            </SimpleGrid>
          </Flex>

        </Stack>
      </Stack>
    </Flex>
  );
}




