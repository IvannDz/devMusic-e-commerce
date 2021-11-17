/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import { Flex, Wrap, WrapItem, Button } from "@chakra-ui/react";

export default function Search() {
  const name = useParams().name;
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/products/name/${name}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(products);
        setProducts(data);
      });
  }, [name]);

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
          <Button
            variant="outline"
            colorScheme="teal"
            mx="20px"
            onClick={() => console.log("1")}
          >
            PREV
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            mx="20px"
            onClick={() => console.log("1")}
          >
            NEXT
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
