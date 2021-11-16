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
  useRangeSlider,
} from "@chakra-ui/react";
import { isRejected } from "@reduxjs/toolkit";

export default function Component() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/admin/users`)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        setUsers(data);
        console.log("DATA", data);
      });
  }, []);

  const data = users;
  console.log("USERS2", data);

  return (
    <Flex
      w="full"
      bg="gray.600"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      {/* encabezado */}
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
            <span>ID</span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Name
            </chakra.span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Is Admin
            </chakra.span>
          </SimpleGrid>
        </Flex>

        {/* Filas a mapear */}
        {data.map((user, uid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg="white"
              key={uid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 4 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{user.id}</span>

                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {user.userName}
                </chakra.span>

                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {user.isAdmin ? <p>Yes</p> : <p>No</p>}
                </chakra.span>

                <Flex justify={{ md: "end" }}>
                  <Button variant="solid" colorScheme="red" size="sm"
                  
                    onClick = {(e)=>{
                        
                    }}
                  >
                    Set Admin
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
