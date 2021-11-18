import {
    Flex,
    Box,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  import { useParams } from "react-router-dom";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { useHistory } from "react-router";
  
  export default function SimpleCard() {
    const { id } = useParams();
    const [edit, setEdit] = useState("");
    const [category, setCategory] = useState({});
    const history = useHistory();
  
    useEffect(() => {
      axios
        .get(`/api/admin/category/${id}`)
        .then((resp) => setCategory(resp.data));
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .put(`/api/admin/category/${id}`, { name: edit })
        .then((resp) => history.push("/admin/categories"));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Edit category</Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormLabel>Current category: {category.name}</FormLabel>
                <Input
                  placeholder="Set new category..."
                  type="text"
                  value={edit}
                  onChange={(e) => {
                    setEdit(e.target.value);
                  }}
                />
  
                <Stack spacing={10} >
                  <Button
                    type="submit"
                    colorScheme={"pink"}
                    variant="solid"
                    color={"white"}
                  >
                    Set category
                  </Button>
                </Stack>
               
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    );
  }