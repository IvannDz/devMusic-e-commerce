import React from "react";
import { Link } from "react-router-dom";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { ImMusic } from "react-icons/im";

const Checkout = () => {
  return (
    <SimpleGrid
      mb={100}
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        bg: "brand.500",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={24}
      >
        <Badge
          color="white"
          px={3}
          py={1}
          mb={3}
          variant="solid"
          colorScheme="brand"
          rounded="full"
        >
          Pre Beta
        </Badge>
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.300")}
          lineHeight="shorter"
        >
          Thank you for shopping with devMusic!
          <ImMusic />
        </chakra.h1>
        <Link to={"/"}>
          <Button>Continue Shopping</Button>
        </Link>
      </Flex>
      <Box>
        <Image
          src="https://images.pexels.com/photos/290660/pexels-photo-290660.jpeg?cs=srgb&dl=pexels-pixabay-290660.jpg&fm=jpg"
          fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          bg="gray.100"
          loading="lazy"
        />
      </Box>
    </SimpleGrid>
  );
};

export default Checkout;
