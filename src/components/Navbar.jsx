import React from "react";
import { Link } from "react-router-dom";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai";


export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
          <Link to="/">
            <chakra.h1 fontSize="xl" fontWeight="semi-bold" ml="2">
              devMusic
            </chakra.h1>
            </Link>

          </Flex>

          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost">Categorias</Button>
             
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
              />
              <Input type="tel" placeholder="Search..." />
            </InputGroup>
            <Link to="/login">
              <Button variant="solid" colorScheme="pink">Login</Button>
            </Link>
            </HStack>
            <Link to="/register">
            <Button variant="solid" colorScheme="pink">Sign Up</Button>
            </Link>
            <Link to="/cart">
            <IconButton
                      colorScheme="pink"
                      variant="outline"
                      icon={<AiOutlineShoppingCart />}
                    />
            </Link>



            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}






