/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { StarIcon, AddIcon } from "@chakra-ui/icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faComments } from "@fortawesome/free-solid-svg-icons"
import {
  Wrap,
  chakra,
  WrapItem,
  Heading,
  Textarea,
  Button,
  InputGroup,
  Input,
  Text,
  Stack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import SingleComment from "./SingleComment";

const CommentSection = ({ id }) => {
  const toast = useToast();
  const [getcomments, setGetComments] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [buyConditions, setBuyConditions] = useState(false);
  const [actualize, setActualize] = useState("");

  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((res) => res.data) //=>
      .then((data) => {
        setGetComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, [actualize]);

  let comento = false;
  //Busca id de usuario no sabia como hacerlo jelp.
  useEffect(() => {
    axios.get("/api/auth/me").then((resp) => {
      if (!resp.data) return;
      else return setUserId(resp.data.id);
    });
  }, []);
  //postea el comentario

  const handleSubmit = (e) => {
    axios
      .post(`/api/comments/${id}`, { content: content, puntuacion: puntuacion })
      .then((res) => setActualize(res.data));
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

  return (
    <Box
      w="md"
      mx="auto"
      py={2}
      px={6}
      mr={250}
      bg="white"
      /*       shadow="dark-lg"
       */ rounded="lg"
      border="5px"
      Color="#FFCD1F"
    >
      <Heading color="black" >
    
        Comment section:</Heading>
      {buyConditions === true && (
        <Box>
          <>
            <Text mb="8px" color="black">
              Rate this product:
            </Text>
            <Stack direction="row" spacing={5}>
              <Box d="flex" mt="2" alignItems="center" mb={6}>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      onClick={() => setPuntuacion(i)}
                      color={i <= puntuacion ? "teal.500" : "gray.300"}
                    />
                  ))}
              </Box>
            </Stack>

            <Text mb="8px" color="black">
              {comento === true ? "Edit your coment" : "Leave a comment:"}
            </Text>
            <Textarea
              color="black"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
          </>
          <Flex
            justifyContent={{ base: "center", md: "end" }}
            m={3}
            
          >
            <Button bg="black"
            onClick={() => {
              handleSubmit();
              toast({
                title: "Comment! 👍",
                description: "Successful operation",
                status: "info",
                duration: 2000,
                isClosable: true,
              });
            }}>
              <AddIcon color="white" />
            </Button>
          </Flex>
        </Box>
      )}

      <Box d="flex" alignItems="flex-start" justifyContent="" w="auto">
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
              bg={("#F9FAFB", "#0c0f0a")}
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
                bg="#0c0f0a"
                shadow="lg"
                rounded="lg"
              >
                <chakra.p bg="#0c0f0a" color="gray.200">Sin comentarios</chakra.p>
              </Box>
            </Flex>
          </Wrap>
        )}
      </Box>
    </Box>
  );
};

export default CommentSection;
