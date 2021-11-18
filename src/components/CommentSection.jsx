import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Wrap, WrapItem, Heading } from "@chakra-ui/react";
import axios from "axios";
import SingleComment from "./SingleComment";

const CommentSection = ( {id} ) => {
  // const [comments, setComments] = useState([])
  const [getcomments, setGetComments] = useState([]);
  
  useEffect(() => {
    axios
      .get(`/api/products/id/${id}`)
      .then((res) => res.data) //=>
      .then((data) => {setGetComments(data.comments)}) //Array con los comentarios.
      .catch((err) => console.log(err));
  }, [id]);
  /*  .catch(err => console.log(err)) */

  return (
    <>
    <Heading>Comment section:</Heading>
      <Box
        d="flex"
        alignItems="flex-start"
        justifyContent=""
        w="auto"
        p={4}
        color="black"
        ml={3}
        mr={3}
      >
        <Wrap>
          {getcomments.map((comment, i) => (
            <WrapItem key={i}>
                <SingleComment comment={comment} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </>
  );
};

export default CommentSection;
