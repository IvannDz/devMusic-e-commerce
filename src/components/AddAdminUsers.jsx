import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  chakra,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

export default function Component() {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  useEffect(() => {
    axios
      .get(`/api/admin/users`)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <Flex
      w="full"
      bg="white"
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
        {users.map((user, uid) => {
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
                  <Button
                    variant="solid"
                    colorScheme="green"
                    size="sm"
                    onClick={() => {
                      if (user.isAdmin) {
                        return axios
                          .put(`/api/admin/users/${user.id}`, {
                            isAdmin: false,
                          })
                          .then((resp) =>
                            axios
                              .get(`/api/admin/users`)
                              .then((resp) => {
                                toast({
                                  title: "Change Success",
                                  description: "User degraded",
                                  status: "error",
                                  duration: 2000,
                                  isClosable: true,
                                });
                                return resp.data;
                              })
                              .then((data) => {
                                setUsers(data);
                              })
                          );
                      } else {
                        return axios
                          .put(`/api/admin/users/${user.id}`, {
                            isAdmin: true,
                          })
                          .then((resp) =>
                            axios
                              .get(`/api/admin/users`)
                              .then((resp) => {
                                toast({
                                  title: "Change Success",
                                  description: "User Promoted",
                                  status: "success",
                                  duration: 2000,
                                  isClosable: true,
                                });
                                return resp.data;
                              })
                              .then((data) => {
                                setUsers(data);
                              })
                          );
                      }
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
