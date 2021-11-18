import React from "react";

import {
  Box,
  useColorModeValue,
  Button,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';


export default function Gslr() {

  return (
    <Box
    borderTopWidth={1}
    borderStyle={'solid'}
    borderColor={useColorModeValue('gray.200', 'gray.700')}>
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ md: 'space-between' }}
      align={{ md: 'center' }}>
      <Text>© 2021 devMusic. All rights reserved</Text>
      <Stack direction={'row'} spacing={6}>
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