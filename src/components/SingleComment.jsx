import React from "react";
import { ChatIcon } from '@chakra-ui/icons'

import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Icon
} from "@chakra-ui/react";

const SingleComment = ({comment}) => {
  return (
        <Flex
          bg={useColorModeValue("#F9FAFB", "gray.600")}
          p={1}
          alignItems="center" //chequear
          justifyContent="center"
          rounded="lg"
        >
          <Box
            w="md"
            mx="auto"
            py={2}
            px={6}
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="lg"
          >
            <Icon as={ChatIcon} />
    
            <chakra.p  color={useColorModeValue("gray.600", "gray.200")}>
            {comment.content}       
            </chakra.p>
            <p><strong> puntuacion: {comment.puntuacion} </strong></p>
    
            <Flex justifyContent="end" fontSize="md"
                color={useColorModeValue("brand.500", "brand.300")}>
                Nombre =/ Opcional x ruta
              <Flex justifyContent={{ base: "center", md: "end" }} >
              <Image
                w={8}
                h={8}
                rounded="full"
                borderStyle="solid"
                borderWidth={2}
                borderColor={useColorModeValue("brand.200", "brand.100")}
                alt="Testimonial avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              />
            </Flex>
            </Flex>
          </Box>
        </Flex>
  );
};

export default SingleComment;
