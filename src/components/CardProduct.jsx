import React, { useEffect } from "react";
import { chakra, Box, Link, Image, Grid, GridItem, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

const Ma = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const [valoration, setValoration] = React.useState({});
  const user = useSelector((state) => state.user);
  const toast= useToast();
  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((resp) => resp.data)
      .then((data) => {
        setProduct(data.product);
        setValoration(data.valoration);
      });
  }, [id]);

  const addToCart = () => {
    return axios
      .post(`/api/cart`, { id: product.id, price: product.price })
      .then((resp) => {
        toast({
          title: "Product added ",
          description: "Your product has been added",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        return resp.data;
      });
  };

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      h="full"
    >
      <GridItem rowSpan={2} colSpan={3} bg="white" h="500px">
        <Box
          w="3xl"
          h="full"
          bg="#0c0f0a"
          mx={{ lg: 8 }}
          display={{ lg: "flex" }}
          maxW={{ lg: "5xl" }}
          /*      shadow="dark-lg" */
          rounded={{ lg: "lg" }}
         // ml={2}
          mt={2}
         
          border="solid black 2px"
          
         
        >
          <Box w={{ lg: "50%" }} alignItems="center">
            <Image
            ml="25px"
              rounded={"lg"}
            //  border="solid 3px"
          //    borderColor="#e6e6e6"
              height="full"
              width="full"
              objectFit={"contain"}
              src={product.photo}
            />
          </Box>

          <Box
           ml="25px"
            py={12}
            px={6}
            maxW={{ base: "xl", lg: "5xl" }}
            w={{ lg: "50%" }}
           // border="solid black 1px"
          >
            <chakra.h2
              fontSize={{ base: "2xl", md: "3xl" }}
              color="#ffcd1f"
              fontWeight="bold"
            >
              {product.name}
            </chakra.h2>
            <chakra.p mt={4} color="#ffcd1f">
              {product.description}
            </chakra.p>
            <chakra.h1 color="#ffcd1f" fontWeight="bold" fontSize="lg">
              USD {product.price}
            </chakra.h1>
            <chakra.h1 color="#ffcd1f" fontWeight="bold" fontSize="lg">
              Stock: {product.stock}
            </chakra.h1>
            <Box d="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < valoration ? "teal.500" : "gray.300"}
                  />
                ))}
            </Box>

            {user?.id ? (
              <Box mt={8}>
                <Link
                  onClick={addToCart}
                  bg="#FFCD1F"
                  color="black"
                  px={5}
                  py={3}
                  fontWeight="semibold"
                  rounded="lg"
                  _hover={{ bg: "gray.800" }}
                >
                  Add to Cart
                </Link>
              </Box>
            ) : (
              <Box mt={8}>
                <Link
                  href="/login"
                  bg="gray.900"
                  color="gray.100"
                  px={5}
                  py={3}
                  fontWeight="semibold"
                  rounded="lg"
                  _hover={{ bg: "gray.800" }}
                >
                  Login
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={2} bg="white" h="full">
        <CommentSection id={id} />
      </GridItem>
    </Grid>
  );
};

export default Ma;
