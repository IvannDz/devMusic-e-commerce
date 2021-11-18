import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function AddCategory() {
    const toast = useToast();

  const history = useHistory();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/admin/category/`, { name })
    .then((resp) => {
        toast({
            title: "Action Success.",
            description: "Category created.",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        return resp.data})
    history.push("/admin/categories")
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
            <Heading fontSize={"4xl"}>Add category</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormLabel>Please create a new category:</FormLabel>
              <Input
                placeholder="Set new category..."
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <Stack spacing={10}>
                <Button
                  type="submit"
                  colorScheme={"pink"}
                  variant="solid"
                  color={"white"}
                >
                  Create Category
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
