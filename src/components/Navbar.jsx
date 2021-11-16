import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../state/userReducer";
import axios from "axios";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { callExpression } from "@babel/types";

export default function Navbar() {
  const mobileNav = useDisclosure();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4747/api/products/category")
      .then((resp) => resp.data)
      .then((categorias) => setCategorias(categorias));
  }, []);

  const user = useSelector((state) => state.user);
  console.log("USERRRR", user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <React.Fragment>
      <chakra.header
        bg={"white"}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        {user?.id ? (
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
                <Box zIndex="9999">
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Categories
                    </MenuButton>
                    <MenuList>
                      {categorias.map((categoria) => (
                        <Link to={`/category/${categoria.name}`}>
                          <MenuItem>{categoria.name}</MenuItem>
                        </Link>
                      ))}

                  
                    </MenuList>
                  </Menu>
                </Box>

                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="tel" placeholder="Search..." />
                </InputGroup>
                {user.isSuperAdmin || user.isAdmin ? (
                  <Link to="/admin">
                    <Button variant="solid" colorScheme="pink">
                      {user.userName}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/orders">
                    <Button variant="solid" colorScheme="pink">
                      {user.userName}
                    </Button>
                  </Link>
                )}
              </HStack>
              <Link to="/">
                <Button
                  variant="solid"
                  colorScheme="pink"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
              {user.isAdmin || user.isSuperAdmin ? (
                
                  <Link to="/admin">
                    <IconButton
                      colorScheme="pink"
                      variant="outline"
                      icon={<FaUserCog />}
                    />
                  </Link>
                
              ) : (
                <Link to="/cart">
                  <IconButton
                    colorScheme="pink"
                    variant="outline"
                    icon={<AiOutlineShoppingCart />}
                  />
                </Link>
              )}

              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
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
                  bg={"white"}
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
        ) : (
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
                <Box zIndex="9999">
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Categories
                    </MenuButton>
                    <MenuList>
                      {categorias.map((categoria) => (
                        <Link to={`/category/${categoria.name}`}>
                          <MenuItem>{categoria.name}</MenuItem>
                        </Link>
                      ))}

                      <MenuItem>Cuerda</MenuItem>
                      <MenuItem>Percusion</MenuItem>
                      <MenuItem>Amplificadores</MenuItem>
                      <MenuItem>Viento</MenuItem>
                      <MenuItem>Microfono</MenuItem>
                      <MenuItem>Bajo</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>

                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input type="tel" placeholder="Search..." />
                </InputGroup>

                <Link to="/login">
                  <Button variant="solid" colorScheme="pink">
                    Login
                  </Button>
                </Link>
              </HStack>
              <Link to="/register">
                <Button variant="solid" colorScheme="pink">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
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
                  color="gray.800"
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
                  bg={"white"}
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
        )}
      </chakra.header>
    </React.Fragment>
  );
}
