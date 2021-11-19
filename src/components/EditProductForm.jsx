import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router";

import {
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast
} from "@chakra-ui/react";

export default function EditProductForm() {
  const toast= useToast();
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [photo, setPhoto] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios.get(`/api/products/id/${id}`).then(({ data }) => {
      console.log(data);
      setName(data.product.name);
      setModel(data.product.model);
      setPhoto(data.product.photo);
      setStock(data.product.stock);
      setPrice(data.product.price);
      setDescription(data.product.description);
      setCategory(data.categoryName?.name);
    });
  }, []);
  
  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    axios
      .put(`/api/admin/product/${id}`, {
        name: name,
        model: model,
        photo: photo,
        stock: stock,
        price: price,
        description: description,
        category: category,
      })
      .then((resp) => {
        toast({
          title: "Edit Success",
          description: "Product edited",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        return resp.data})
        history.push("/admin/productslist")

  };

  return (
    <form onSubmit={handleSubmit}>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
          <Box py={5}>
            <Box
              borderTop="solid 1px"
              borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
            ></Box>
          </Box>
        </Box>

        <Box mt={[10, 0]}>
          <SimpleGrid
            display={{ base: "initial", md: "grid" }}
            columns={{ md: 3 }}
            spacing={{ md: 6 }}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]}>
                <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                  Edit a product
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Use a permanent address where you can receive mail.
                </Text>
              </Box>
            </GridItem>
            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}  >
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Name
                    </FormLabel>
                    <Input
                      type="text"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={name}
                      onChange={(e) => handleChange(e, setName)}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}  >
                    <FormLabel
                      htmlFor="last_name"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Model
                    </FormLabel>
                    <Input
                      type="text"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={model}
                      onChange={(e) => handleChange(e, setModel)}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 3]}  >
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Stock
                    </FormLabel>
                    <Input
                      type="number"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={stock}
                      onChange={(e) => handleChange(e, setStock)}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}  >
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Price
                    </FormLabel>
                    <Input
                      type="number"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={price}
                      onChange={(e) => handleChange(e, setPrice)}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}  >
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Photo Url
                    </FormLabel>
                    <Input
                      type="text"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={photo}
                      onChange={(e) => handleChange(e, setPhoto)}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                    <div>
                      <FormControl id="email" mt={1}  >
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={useColorModeValue("gray.700", "gray.50")}
                        >
                          Description
                        </FormLabel>
                        <Textarea
                          placeholder="Add a description."
                          mt={1}
                          rows={3}
                          shadow="sm"
                          focusBorderColor="brand.400"
                          fontSize={{ sm: "sm" }}
                          value={description}
                          onChange={(e) => handleChange(e, setDescription)}
                        />
                      </FormControl>
                    </div>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                    <div>
                      <FormControl mt={1}  >
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={useColorModeValue("gray.700", "gray.50")}
                        >
                          Category
                        </FormLabel>
                        <Input
                          type="text"
                          mt={1}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          rounded="md"
                          value={category}
                          onChange={(e) => handleChange(e, setCategory)}
                        />
                      </FormControl>
                    </div>
                  </FormControl>
                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                {/* <Link to={"/admin/productslist"}> */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                >
                  Save
                </Button>
                {/* </Link> */}
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </form>
  );
}
