/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import { Flex, Wrap, WrapItem, Button } from "@chakra-ui/react";

export default function Search() {
  const history = useHistory();
  let { name, page } = useParams();
  page = parseInt(page);
  const [products, setProducts] = React.useState([]);
  const [next, setNext] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/products/name/${name}?page=${page}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(products);
        setProducts(data);
      });

    axios
      .get(`/api/products/name/${name}?page=${page + 1}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(products);
        setNext(data);
      });
  }, [name, page]);

  return (
    <>
      <Flex direction="column">
        <Flex direction="row">
          <Wrap spacing="10px" justify="center" mr="10px">
            {products.map((instrument, i) => (
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
                history.push(`/search/${name}/${page - 1}`);
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
              onClick={() => history.push(`/search/${name}/${page + 1}`)}
            >
              <a href="#1">NEXT</a>
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}
