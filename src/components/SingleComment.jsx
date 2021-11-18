import React from "react";
import { ChatIcon, StarIcon } from '@chakra-ui/icons'
import {
  chakra,
  Box,
  Image,
  Flex,
  Icon
} from "@chakra-ui/react";

const SingleComment = ({comment}) => {
  return (
        <Flex
          bg={("#F9FAFB", "gray.600")}
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
            bg="gray.800"
            shadow="lg"
            rounded="lg"
          >
            <Icon as={ChatIcon} color="gray.200"/>
    
            <chakra.p  color="gray.200">
            {comment.content}       
            </chakra.p>
            <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < comment.puntuacion ? "teal.500" : "gray.300"}
                />
              ))}
             </Box>
    
            <Flex justifyContent="end" fontSize="md"
                color="gray.300">
                User
              <Flex justifyContent={{ base: "center", md: "end" }} >
              <Image
                w={8}
                h={8}
                rounded="full"
                borderStyle="solid"
                borderWidth={2}
                borderColor= "brand.100"
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
