import React from "react";
import { chakra, Box, Flex, useColorModeValue, Link, Image } from "@chakra-ui/react";
import fakeProd from "../utils/fakeProd"

const Ma = () => {
const {name,description,price,image,stock}=fakeProd

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
        <Image
            rounded={"lg"}
            height="full"
            width="full"
            objectFit={"cover"}
            src={image}
          />
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {name}
            
          </chakra.h2>
          <chakra.p mt={4} color={useColorModeValue("gray.600", "gray.400")}>
            {description}
          </chakra.p>
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            $129
          </chakra.h1>
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            Stock: {stock}
          </chakra.h1>

          <Box mt={8}>
            <Link
              
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
              Add to Cart
            </Link>
          </Box>
            
        </Box>
        
      </Box>
    </Flex>
  );
};

export default Ma;