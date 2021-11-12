import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-number-input'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
} = useForm();

    const valUser = /^[a-zA-Z0-9_.-]*$/;
    const noValUser = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~*]/;
    const valNum= /[0-9]/g 

  const onSubmit = ({userName,email,password,tel}) => {
    axios
      .post("/api/auth/register", {
        userName,
        email,
        password,
        tel,
      })
      .then((res) => res.data);
    history.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>

              <FormControl id="userName" isInvalid={noValUser.test(userName) && errors.userName} isRequired >
                <FormLabel htmlFor="name">User</FormLabel>
                <Input
                  id="userName"
                  type="text"
                  {...register('userName', {
                    required: 'Allow only numbers and characters',
                    pattern: {
                        value: valUser,
                        message: 'Allow Only numbers and characters',
                    },
                    minLength: { value: 3, message: 'Minimum length should be 3' },
                })}
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  
                />
                <FormErrorMessage>{errors.userName && errors.userName.message}</FormErrorMessage>
              </FormControl>


              <FormControl id="email" isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  
                  {...register('email', {
                    required: 'Email is Required',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Invalid email address',
                    },
                })}
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                />
              </FormControl>

              <FormControl id="password" isInvalid={password.length < 5 && errors.password} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  {...register('password', {

                    required: 'Password is Required',
                    pattern:{
                      minLength: { value: 5},
                      message: 'Password minimun length should be 5'
                    }
                  })}
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="tel" isInvalid={noValUser.test(tel) && errors.tel} isRequired >
                <FormLabel htmlFor="name">Telephone</FormLabel>
                <Input
                  id="tel"
                  type="text"
                  {...register('tel', {
                    required: 'Allow only numbers',
                    pattern: {
                        value: valNum,
                        message: 'Allow Only numbers',
                    },
                    minLength: { value: 8, message: 'Minimum length should be 8' },
                })}
                  value={tel}
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                  
                />
                <FormErrorMessage>{errors.tel && errors.tel.message}</FormErrorMessage>
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
          </Stack>
        </Box>
      </Stack>
    </Flex>
  </form>
  );
}
