import React from "react";
import fakeProducts from "../utils/fakeData";
import Card from "./Card";
import { Grid, GridItem, Box } from "@chakra-ui/react";

const ProductsGrid = () => {
  const products = fakeProducts;
  return (
    <div className="container">
      {products.map((instrument, i) => (
        <div w="100%" h="5" bg="blue">
          <Card key={i} {...instrument} />
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
