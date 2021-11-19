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
      .then((categorias) => {
        setCategorias(categorias);
      });
  }, []);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search}/1`);
  };

  return (
    <React.Fragment>
      <chakra.header
        bg={"black"}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto" color="#ffcd1f">
          <Flex>
            <Link to="/">
              <chakra.h1 fontSize="xl" fontWeight="semi-bold" ml="2">
                <Box overflow="auto" float="left" w="175px" h="auto">
                <img 
                src="https://cdn.discordapp.com/attachments/911052852607193099/911053682928406588/devMusic_1.jpg" alt="logo" />
                </Box>
              {/* <FontAwesomeIcon icon={faRecordVinyl} size='2x'/> */} {/* devMusic */}
              </chakra.h1>
            </Link>
          </Flex>

          <HStack display="flex" alignItems="center" justify="stretch" >
            <HStack
              spacing={2}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Box zIndex="9999" 
              
              >
                <Menu>
                  <MenuButton variant="solid" bg="#ffcd1f" color="black" as={Button} rightIcon={<ChevronDownIcon />}> {/* 1erBoton */}
                    Categories
                  </MenuButton>
                  <MenuList
                  color="#ffcd1f"
                  bg="#0c0f0a"
                  
                  >
                    {categorias.map((categoria, i) => (
                       <Link key={i} to={`/category/${categoria.name}/1`}>
                       <MenuItem>{categoria.name}</MenuItem>
                     </Link>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
              <form onSubmit={handleSubmit}>
                <InputGroup   >
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    mr={250}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </form>
              {user?.id ? (
                user.isAdmin ? (
                  <HStack>
                    <Box zIndex="9999">
                      {user.isSuperAdmin ? (
                        <Menu>
                          <MenuButton variant="solid" bg="black"  as={Button} icon={<FaUserCog />}>
                            SuperAdmin
                          </MenuButton>
                          <MenuList>
                            <Link to="/admin/users">
                              <MenuItem>Set Users</MenuItem>
                            </Link>

                            <Link to="/admin/categories">
                              <MenuItem>Set Categories</MenuItem>
                            </Link>
                            <Link to="/admin/productslist">
                              <MenuItem>Set Products</MenuItem>
                            </Link>
                          </MenuList>
                        </Menu>
                      ) : (
                        <Menu>
                          <MenuButton as={Button} icon={<FaUserCog />}>
                            Admin
                          </MenuButton>
                          <MenuList>
                            <Link to="/admin/categories">
                              <MenuItem>Set Categories</MenuItem>
                            </Link>
                            <Link to="/admin/productslist">
                              <MenuItem>Set Products</MenuItem>
                            </Link>
                          </MenuList>
                        </Menu>
                      )}
                      
                    </Box>
                    <Link to="/">
                      <Button
                        variant="link"
                        colorScheme="yellow"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Link>
                  </HStack>
                ) : (
                  <HStack>
                    <Link to="/orders">
                      <Button variant="link" colorScheme="yellow" p={3}           > 
                        {user.userName}
                      </Button>
                    </Link>
                    <Link to="/cart">
                      <IconButton
                      color="#0c0f0a"
                        bg="#ffcd1f"
                        variant="solid"
                        icon={<AiOutlineShoppingCart />}
                      />
                    </Link>
                    <Link to="/">
                      <Button
                        variant="solid"
                        bg="#ffcd1f"
                        color="#0c0f0a"
                       // colorScheme="#ffcd1f"
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
                    <Button variant="solid"   color="#0c0f0a"
                        bg="#ffcd1f">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="solid"   color="#0c0f0a"
                        bg="#ffcd1f">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <IconButton
                        color="#0c0f0a"
                        bg="#ffcd1f"
                      variant="solid"
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
