/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { StarIcon, AddIcon } from "@chakra-ui/icons";
import {
  Wrap,
  chakra,
  WrapItem,
  Heading,
  Textarea,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import {Link} from "react-router-dom"
import SingleComment from "./SingleComment";

const CommentSection = ({ id }) => {
  const [getcomments, setGetComments] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [buyConditions, setBuyConditions] = useState(false);

  //setea array con los comentarios.
  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((res) => res.data) //=>
      .then((data) => {
        setGetComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  let comento = false;
  //Busca id de usuario no sabia como hacerlo jelp.
  useEffect(() => {
    axios.get("/api/auth/me").then((resp) => {
      if (!resp.data) return;
      else return setUserId(resp.data.id);
    });
  }, []);
  //postea el comentario
  const handleClick = (e) => setPuntuacion(e);
  const handleReview = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/comments/${id}`, { content, puntuacion })
      .then((res) => res.data);
  };

  //busca los usuarios  order.products
  useEffect(() => {
    axios.get(`/api/auth/me/buyOrder/${id}`).then((res) => {
      setBuyConditions(res.data);
    });
  }, [userId]);

  getcomments.forEach((comment) => {
    if (comment.userId === userId) {
      comento = true;
    }
  });

  console.log(getcomments);
  return (
    <>
      <Heading>Comment section:</Heading>

      {buyConditions === true && (
        <Box
          w="md"
          mx="auto"
          py={2}
          px={6}
          bg="gray.800"
          shadow="lg"
          rounded="lg"
          border="1px"
          borderColor="gray.400"
        >
          <>
            <Text mb="8px" color="gray.500">
              Rate this product:
            </Text>
            <Stack direction="row" spacing={5}>
              <Box d="flex" mt="2" alignItems="center" mb={6}>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      onClick={() => handleClick(i)}
                      color={i <= puntuacion ? "teal.500" : "gray.300"}
                    />
                  ))}
              </Box>
            </Stack>

            <Text mb="8px" color="gray.500">
              {comento === true ? "Edit your coment" : "Leave a comment:"}
            </Text>
            <Textarea
              color="gray.500"
              value={content}
              onChange={handleReview}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
          </>
          <Flex
            justifyContent={{ base: "center", md: "end" }}
            m={3}
            onClick={handleSubmit}
          >
            <Link to={`/products/${id}`}>
              <AddIcon color="gray.200" />
            </Link>
          </Flex>
        </Box>
      )}

      <Box
        d="flex"
        alignItems="flex-start"
        justifyContent=""
        w="auto"
        p={4}
        ml={3}
        mr={3}
      >
        {getcomments.length > 0 ? (
          <Wrap>
            {getcomments.map((comment, i) => {
              return (
                <WrapItem key={i}>
                  <SingleComment comment={comment} />
                </WrapItem>
              );
            })}
          </Wrap>
        ) : (
          <Wrap>
            <Flex
              bg={("#F9FAFB", "gray.600")}
              p={1}
              alignItems="center" //chequear
              justifyContent="center"
              rounded="lg"
            >
              <Box
                w="md"
                mx="auto"
                py={2}
                px={6}
                bg="gray.800"
                shadow="lg"
                rounded="lg"
              >
                <chakra.p color="gray.200">Sin comentarios</chakra.p>
              </Box>
            </Flex>
          </Wrap>
        )}
      </Box>
    </>
  );
};

export default CommentSection;
