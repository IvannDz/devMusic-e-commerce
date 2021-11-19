import React from "react";
import { Link } from "react-router-dom"
import {
  Box,
  useColorModeValue,
  Button,
  Container,
  Stack,
  Text
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';


export default function Gslr() {

  return (
    <Box
    className="footer"
    bottom={"0"}
    w="100%"
    borderTopWidth={1}
    borderStyle={'solid'}
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    bg="black">
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      direction={{ base: 'column', md: 'row' }}
      justify={{ md: 'space-between' }}
      align={{ md: 'center' }}>
      <Text color="white">© 2021 devMusic. All rights reserved</Text>
      <Stack direction={'row'} spacing={6}>
      <Link to="/devs-page">
      <Box overflow="auto" float="left" w="150px" h="auto">
                <img 
                src="https://cdn.discordapp.com/attachments/911052852607193099/911053682928406588/devMusic_1.jpg" alt="logo" />
                </Box>
        </Link>
        <Button label={'Twitter'} href={'#'}>
          <FaTwitter />
        </Button>
        <Button label={'YouTube'} href={'#'}>
          <FaYoutube />
        </Button>
        <Button label={'Instagram'} href={'#'}>
          <FaInstagram />
        </Button>
      </Stack>
    </Container>
  </Box>
  );
}