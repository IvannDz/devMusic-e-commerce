import React from "react";
 import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { FaSignInAlt } from "react-icons/fa";
import {faComment} from '@fortawesome/free-solid-svg-icons'
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

const SingleComment = ({getcomments}) => {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="md"
        mx="auto"
        py={4}
        px={8}
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
      >
        <Flex justifyContent={{ base: "center", md: "end" }} mt={-16}>
          <Image
            w={20}
            h={20}
            fit="cover"
            rounded="full"
            borderStyle="solid"
            borderWidth={2}
            borderColor={useColorModeValue("brand.500", "brand.400")}
            alt="Testimonial avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          />
        </Flex>

        <chakra.h2
          color={useColorModeValue("gray.800", "white")}
          fontSize={{ base: "2xl", md: "3xl" }}
          mt={{ base: 2, md: 0 }}
          fontWeight="bold"
> 
        <FontAwesomeIcon icon={faComment} size='2x' color='red' />
         ...  
        </chakra.h2>

        <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.200")}>
        {getcomments[0].content}       
        </chakra.p>
        <p><strong> puntuacion: {getcomments[0].puntuacion} </strong></p>

        <Flex justifyContent="end" mt={4}>
          <Link
            
            fontSize="xl"
            color={useColorModeValue("brand.500", "brand.300")}
          >
            Nombre =/ Opcional x ruta
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleComment;