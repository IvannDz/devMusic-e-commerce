import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useParams } from "react-router-dom";
import axios from "axios";
import Ma from "./CardProduct";
import SingleComment from "./SingleComment";
import { get } from "react-hook-form";

const CommentSection = () => {
  // const [comments, setComments] = useState([])
  const [getcomments, setGetComments] = useState([]);
  const [newcCom, setNewCom] = useState([]);

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
      <Box
        d="flex"
        alignItems="flex-start"
        justifyContent=""
        bg="#f5f3f4"
        w="50%"
        p={4}
        color="black"
        ml={3}
        borderRadius="lg"
        mr={3}
        borderStartWidth={2}
        border="black solid 2px"
      >
        <Box>Comment section:</Box>
        <Box>
          <Box>
            {getcomments.map((comment) => (
              <Box>
                <SingleComment getcomments={getcomments} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CommentSection;
