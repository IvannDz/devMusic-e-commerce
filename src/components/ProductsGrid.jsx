import React, { useEffect } from "react";
import axios from "axios";
import Card from "./Card";

import Carousel from "react-elastic-carousel";
import { Flex, Heading, Box, Skeleton } from "@chakra-ui/react";

const ProductsGrid = () => {
  const [cuerda, setCuerda] = React.useState([]);
  const [viento, setViento] = React.useState([]);
  const [percusion, setPercusion] = React.useState([]);

  const divIntoThree = (products) => {
    let productsDiv = [];
    for (let i = 0; i < products.length; i += 3) {
      productsDiv.push(products.slice(i, i + 3));
    }
    return productsDiv;
  };

  useEffect(() => {
    axios
      .get(`/api/products/category/cuerda`)
      .then((res) => res.data)
      .then((data) => {
        const datito = divIntoThree(data);
        setCuerda([datito]);
      });
    axios
      .get(`/api/products/category/viento`)
      .then((res) => res.data)
      .then((data) => {
        const datito = divIntoThree(data);
        setViento([datito]);
      });
    axios
      .get(`/api/products/category/percusion`)
      .then((res) => res.data)
      .then((data) => {
        const datito = divIntoThree(data);
        setPercusion([datito]);
      });
  }, []);

  return (
    <Box bg="#e6e6e6">
      <div>
        <span></span>
        <Heading
          textAlign="center"
          fontFamily="Helvetica"
          marginTop="20px"
          marginBottom="px"
        ></Heading>
        <Carousel enableAutoPlay autoPlaySpeed={1500}>
          {cuerda.map((products, i) => {
            return products.map((product, i) => {
              return (
                <Flex direction="column">
                  <Flex direction="row">
                    <Card key={i} {...product[0]} />
                    <Card key={i} {...product[1]} />
                    <Card key={i} {...product[2]} />
                  </Flex>
                </Flex>
              );
            });
          })}
        </Carousel>
      </div>
      <>
        <Heading
          textAlign="center"
          marginTop="20px"
          marginBottom="20px"
          fontFamily={"body"}
        >
          PERCUSION
        </Heading>
        <Carousel>
          {percusion.map((products, i) => {
            return products.map((product, i) => {
              return (
                <Flex direction="column">
                  <Flex direction="row">
                    <Card key={i} {...product[0]} />
                    <Card key={i} {...product[1]} />
                    <Card key={i} {...product[2]} />
                  </Flex>
                </Flex>
              );
            });
          })}
        </Carousel>
      </>
      <>
        <Heading textAlign="center" marginTop="20px" marginBottom="20px">
          VIENTO
        </Heading>
        <Carousel>
          {viento.map((products, i) => {
            return products.map((product, i) => {
              return (
                <Flex direction="column">
                  <Flex direction="row">
                    <Card key={i} {...product[0]} />
                    <Card key={i} {...product[1]} />
                    <Card key={i} {...product[2]} />
                  </Flex>
                </Flex>
              );
            });
          })}
        </Carousel>
      </>
    </Box>
  );
};

export default ProductsGrid;
