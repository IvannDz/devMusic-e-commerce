import {React, useState, useEffect} from "react";
import axios from "axios"
import {useHistory} from "react-router-dom"

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
  const history = useHistory()

  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [tel, setTel] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post("http://localhost:8080/api/auth/register", {
      user,
      email,
      password,
      isAdmin,
      tel
  })
  .then(res => res.data)
  history.push("/login")
  
  }


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.50"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
          <FormControl id="userName">
              <FormLabel>User</FormLabel>
              <Input type="text" onChange ={(e)=> setUser(e.target.value)} value={user}/>
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange ={(e)=> setEmail(e.target.value)} value={email}/>
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange ={(e)=> setPassword(e.target.value)} value={password}/>
            </FormControl>

            <FormControl id="tel">
              <FormLabel>Telephone</FormLabel>
              <Input type="number" onChange ={(e)=> {setTel(e.target.value)
              console.log(e.value.target)}} value={tel}/>
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
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
