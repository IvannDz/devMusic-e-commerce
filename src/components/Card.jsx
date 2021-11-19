import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Card({ name, price, photo, id }) {
  console.log(name);
  return (
    <Center py={12}>
      <Link to={`/products/${id}`}>
        <Box
        
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg="black"
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          m={5}
        >
          <Box
            bg="white"
            rounded={"lg"}
            pos={"relative"}
            height={"230px"}
            borderRightWidth={2}
            // borderBottomWidth={2}
            boxShadow={"lg"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              // backgroundImage: `url(${photo})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={229}
              width={282}
              objectFit={"contain"}
              src={photo}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Heading fontSize={"md"} fontFamily={"body"} fontWeight={500} color="#ffcd1f">
              {name}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"} color="#ffcd1f">
                $ {price}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}

export default Card;
