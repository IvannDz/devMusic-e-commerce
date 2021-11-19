/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useParams, useHistory } from "react-router-dom";
import { Flex, Wrap, WrapItem, Button } from "@chakra-ui/react";
import axios from "axios";

const CategoryGrid = () => {
  const history = useHistory();
  let { category, page = 1 } = useParams();
  page = parseInt(page);
  const [productsCat, setProductsCat] = useState([]);
  const [next, setNext] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/category/${category}?page=${page}`)
      .then((resp) => resp.data)
      .then((productos) => setProductsCat(productos));

    axios
      .get(`/api/products/category/${category}?page=${page + 1}`)
      .then((resp) => resp.data)
      .then((productos) => setNext(productos));
  }, [category, page]);
  return (
    <>
      <Flex direction="column">
        <Flex direction="row">
          <Wrap spacing="10px" justify="center" mr="10px">
            {productsCat.map((instrument, i) => (
              <WrapItem key={i}>
                <Card key={i} {...instrument} />
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
        <Flex direction="row" mx="auto" my="50px">
          {!(page == 1) && (
            <Button
              variant="outline"
              colorScheme="teal"
              mx="20px"
              onClick={() => {
                history.push(`/category/${category}/${page - 1}`);
              }}
            >
              <a href="#1">PREV</a>
            </Button>
          )}
          {next.length > 0 && (
            <Button
              variant="outline"
              colorScheme="teal"
              mx="20px"
              onClick={() => history.push(`/category/${category}/${page + 1}`)}
            >
              <a href="#1">NEXT</a>
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default CategoryGrid;
