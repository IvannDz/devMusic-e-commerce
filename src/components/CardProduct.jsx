import React, { useEffect } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Link,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import fakeProd from "../utils/fakeProd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setProducts } from "../state/productsReducer";
import { useParams, useHistory } from "react-router-dom";
import CommentSection from "./CommentSection";

const Ma = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((resp) => resp.data)
      .then((data) => setProduct(data.product));
  }, []);

  const addToCart = () => {
    return axios
      .post(`/api/cart`, { id: product.id, price: product.price })
      .then((resp) => {
        console.log(resp);
        return resp.data;
      });
  };

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} h="full">
      <GridItem colSpan={2} h="500px" bg="tomato" w="full" pos="fixed">
        <Box
          w="full"
          h="full"
          bg="white"
          mx={{ lg: 8 }}
          display={{ lg: "flex" }}
          maxW={{ lg: "5xl" }}
          shadow={{ lg: "lg" }}
          rounded={{ lg: "lg" }}
        >
          <Box w={{ lg: "50%" }}>
            <Image
              rounded={"lg"}
              height="full"
              width="full"
              objectFit={"cover"}
              src={product.photo}
            />
          </Box>

          <Box
            py={12}
            px={6}
            maxW={{ base: "xl", lg: "5xl" }}
            w={{ lg: "50%" }}
          >
            <chakra.h2
              fontSize={{ base: "2xl", md: "3xl" }}
              color="gray.800"
              fontWeight="bold"
            >
              {product.name}
            </chakra.h2>
            <chakra.p mt={4} color="gray.600">
              {product.description}
            </chakra.p>
            <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
              {product.price}
            </chakra.h1>
            <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
              Stock: {product.stock}
            </chakra.h1>

            {user?.id ? (
              <Box mt={8}>
                <Link
                  onClick={addToCart}
                  bg="gray.900"
                  color="gray.100"
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
      <GridItem colStart={4} h="10" bg="papayawhip" h="full">
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
        <div>
          <h3>comment</h3>
          <p>lorem ipsum dolor sit autoComplete</p>
        </div>
      </GridItem>
    </Grid>
  );
};

export default Ma;
