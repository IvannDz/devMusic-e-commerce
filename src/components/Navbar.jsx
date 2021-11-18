import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../state/userReducer";
import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  chakra,
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

export default function Navbar() {
  const mobileNav = useDisclosure();
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/products/category")
      .then((resp) => resp.data)
      .then((categorias) => setCategorias(categorias));
  }, []);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    history.push(`/search/${search}`);
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
                    {categorias.map((categoria, i) => (
                      <Link key={i} to={`/category/${categoria.name}`}>
                        <MenuItem>{categoria.name}</MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </form>
              {user?.id ? (
                user.isAdmin ? (
                  <HStack>
                    <Link to="/admin/users">
                      <Button variant="solid" colorScheme="pink">
                        {user.userName}
                      </Button>
                    </Link>
                    <Link to="/admin">
                      <IconButton
                        colorScheme="pink"
                        variant="outline"
                        icon={<FaUserCog />}
                      />
                    </Link>
                    <Link to="/">
                      <Button
                        variant="solid"
                        colorScheme="gray"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Link>
                  </HStack>
                ) : (
                  <HStack>
                    <Link to="/orders">
                      <Button variant="solid" colorScheme="pink">
                        {user.userName}
                      </Button>
                    </Link>
                    <Link to="/cart">
                      <IconButton
                        colorScheme="pink"
                        variant="outline"
                        icon={<AiOutlineShoppingCart />}
                      />
                    </Link>
                    <Link to="/">
                      <Button
                        variant="solid"
                        colorScheme="gray"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Link>
                  </HStack>
                )
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="solid" colorScheme="gray">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="solid" colorScheme="gray">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <IconButton
                      colorScheme="gray"
                      variant="outline"
                      icon={<AiOutlineShoppingCart />}
                    />
                  </Link>
                </>
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
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
