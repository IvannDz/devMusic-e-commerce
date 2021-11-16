import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  console.log("productos", products);

  useEffect(() => {
    axios
      .get(`http://localhost:4747/api/cart`)
      .then((resp) => {
        console.log("resp carrito completo", resp);

        return resp.data;
      })
      .then((data) => setProducts(data.products));
  }, []);

  const data = products;

  const total = products.reduce((acum, products) => {
    return (acum = products.price * products.cantidad + acum);
  }, 0);
  console.log("TOTALLLLL", total);

  return (
    <Flex
      w="full"
      bg="gray.600"
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
                  <Button variant="solid" colorScheme="red" size="sm">
                    Delete
                  </Button>

                  <Button
                    variant="solid"
                    colorScheme="green"
                    size="sm"
                    onClick={() => {
                      return axios
                        .post(`/api/cart`, {
                          id: product.id,
                          price: product.price,
                        })
                        .then((resp) => {
                          console.log(resp);
                          return resp.data;
                        })
                        .then(() => {
                          axios
                            .get(`/api/cart`)
                            .then((resp) => resp.data)
                            .then((data) => setProducts(data.products));
                        });
                    }}
                  >
                    +
                  </Button>

                  <Button
                    variant="solid"
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      axios
                        .delete(`/api/cart`, {
                          data: { idProduct: product.id, price: product.price },
                        })
                        .then((resp) => resp.data)
                        .then(() => {
                          axios
                            .get(`/api/cart`)
                            .then((resp) => resp.data)
                            .then((data) => setProducts(data.products));
                        });
                    }}
                  >
                    -
                  </Button>
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
            >
              <span>{`Total: $${total}`}</span>
                

              <Link to="/checkout">
                <Button
                  variant="solid"
                  colorScheme="green"
                  size="sm"
                  onClick={() => {
                    axios.put(`/api/cart/buy`).then((resp) => resp.data);
                  }}
                >
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
