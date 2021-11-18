import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {GrEdit, GrAdd} from 'react-icons/gr'
import {AiFillDelete} from 'react-icons/ai'
import {
  chakra,
  Flex,

  Button,

  Stack,
  SimpleGrid,

  useToast
} from "@chakra-ui/react";


export default function Component() {
  const [categories, setCategories] = useState([]);
  const toast= useToast();

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
                
                  <Flex justify={{ md: "end" }}>
                    <Link to={`/admin/category/${category.id}`}>
                      <Button
                        variant="outline"
                        bg="gray.400"
                        size="sm"
                        
                      ><GrEdit/>
                      </Button>
                    </Link>
                    <Link to={`/admin/add/category`}>
                      <Button
                        variant="outline"
                        bg="gray.400"
                        size="sm"
                        mr={2}
                        ml={2}
                      >
                       <GrAdd/>
                      </Button>
                    </Link>

                  </Flex>
                  <Flex>
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
                                toast({
                                  title: "Action Success",
                                  description: "Category Deleted",
                                  status: "error",
                                  duration: 2000,
                                  isClosable: true,
                                })
                                return resp.data;
                              })
                              .then((data) => {
                                setCategories(data);
                              });
                          });
                      }}
                    >
                      <AiFillDelete/>
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
