<<<<<<< HEAD
import { React, useState } from "react";
=======
import { React, useState} from "react";
>>>>>>> 131a919d26b07a5419889b67a432c7aef1814dd3
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function RegisterForm() {
  const history = useHistory();

<<<<<<< HEAD
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
=======
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
>>>>>>> 131a919d26b07a5419889b67a432c7aef1814dd3
  const [tel, setTel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
<<<<<<< HEAD
      .post("/api/auth/register", {
        userName,
=======
      .post("http://localhost:8080/api/auth/register", {
        user,
>>>>>>> 131a919d26b07a5419889b67a432c7aef1814dd3
        email,
        password,
        tel,
      })
      .then((res) => res.data);
<<<<<<< HEAD
=======
    alert("El usuario se ha registrado");
>>>>>>> 131a919d26b07a5419889b67a432c7aef1814dd3
    history.push("/login");
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
<<<<<<< HEAD
            <form onSubmit={handleSubmit}>
              <FormControl id="userName">
                <FormLabel>User</FormLabel>
                <Input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </FormControl>

              <FormControl id="tel">
                <FormLabel>Telephone</FormLabel>
                <Input
                  type="number"
                  value={tel}
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot-password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
=======
            <FormControl id="userName">
              <FormLabel>User</FormLabel>
              <Input
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </FormControl>

            <FormControl id="tel">
              <FormLabel>Telephone</FormLabel>
              <Input
                type="number"
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot-password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onSubmit={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
>>>>>>> 131a919d26b07a5419889b67a432c7aef1814dd3
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
