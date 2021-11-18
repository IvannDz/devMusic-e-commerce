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
  InputGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { isRejected } from "@reduxjs/toolkit";

export default function Component() {
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState("");

  useEffect(() => {
    axios
      .get(`/api/products/category`)
      .then((resp) => {
        console.log("CATEGORIAS", resp.data);
        return resp.data;
      })
      .then((data) => {
        setCategories(data);
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
            <span>Cat.ID</span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Category
            </chakra.span>
          </SimpleGrid>
        </Flex>

        {/* Filas a mapear */}
        {categories.map((category, cid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg="white"
              key={cid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 4 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{category.id}</span>

                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {category.name}
                </chakra.span>
                <>
                  <Flex justify={{ md: "end" }}>
                    <Link to={`/admin/category/${category.id}`}>
                      <Button
                        variant="solid"
                        colorScheme="green"
                        size="sm"
                        type="submit"
                        onClick={() => {}}
                      >
                        Set Category
                      </Button>
                    </Link>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        return axios
                          .delete(`/api/admin/category/${category.id}`)
                          .then((resp) => resp.data)
                          .then(() => {
                            axios
                              .get(`/api/products/category`)
                              .then((resp) => {
                                console.log("CATEGORIAS", resp.data);
                                return resp.data;
                              })
                              .then((data) => {
                                setCategories(data);
                              });
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}
