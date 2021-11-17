import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [getcomments, setGetComments] = useState([]);

  const [users, setUsers] = useState([]);
  const id = useParams();

  useEffect(() => {
    axios
      .get(`/api/products/id/${id.id}`)
      .then((res) => res.data) //=>
      .then((data) => setGetComments(data.comments)) //Array con los productos.
      .catch((err) => console.log(err));
  }, [id]);
  /*  .catch(err => console.log(err)) */
  return (
    <>
      {console.log("GETCOMMENTS", getcomments)}
      <Box
        d="flex"
        alignItems="center"
        justifyContent="center"
        bg="#f5f3f4"
        w="50%"
        p={4}
        color="black"
        ml={3}
        borderRadius="lg"
        mr={3}
      >
        This is the Box
        <Box>Comment section:</Box>
        <Box>
          <Textarea
            size="md"
            variant="outline"
            placeholder="Here is a sample placeholder"
            onChange={(e) => setComments(e.target.value)}
          ></Textarea>
          <Box>
            {getcomments.map((comment) => (
              <li>
                <ul>{comment.content}</ul>
                <ul>{comment.puntuacion}</ul>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CommentSection;
