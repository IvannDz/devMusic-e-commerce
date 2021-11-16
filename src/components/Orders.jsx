import React, { useState, useEffect } from "react";
import {
  chakra,
  Flex,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/auth/me/buyOrder")
      .then((resp) => resp.data)
      .then((ordenes) => setOrders(ordenes));
  }, []);

  const data = orders;
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
            columns={{ base: 1, md: 3 }}
            w="full"
            py={2}
            px={10}
            fontWeight="hairline"
          >
            <span>ID</span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              PRICE
            </chakra.span>
          </SimpleGrid>
        </Flex>

        {data.map((order, pid) => {
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
                <span>{order.id}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {order.total}
                </chakra.span>
               
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}
