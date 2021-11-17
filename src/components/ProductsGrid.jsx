import React, { useEffect } from "react";
import fakeProducts from "../utils/fakeData";
import axios from "axios";
import Card from "./Card";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setProducts } from "../state/productsReducer";
import Carousel from "react-elastic-carousel";
import { Flex, Wrap, WrapItem, Button, Heading } from "@chakra-ui/react";

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

  console.log("cuerda", cuerda);
  return (
    <>
      <div>
        <Heading textAlign="center" marginTop="20px" marginBottom="20px">
          Cuerda
        </Heading>
        <Carousel>
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
        <Heading textAlign="center" marginTop="20px" marginBottom="20px">
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
    </>
  );
};

export default ProductsGrid;

/*
<Flex direction="column">
          CUERDA
          <Flex direction="row">
            <Card key={i} {...products[0]} />
          </Flex>
          <Flex direction="row">
            <Card key={i} {...products[0]} />
          </Flex>
          <Flex direction="row">
            <Card key={i} {...products[0]} />
          </Flex>
        </Flex>;*/
