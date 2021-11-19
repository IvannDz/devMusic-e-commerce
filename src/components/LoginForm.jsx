import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../state/userReducer";
import { useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const valEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const onSubmit = () => {
    dispatch(loginRequest({ email, password })).then((res) => {
      toast({
        title: "Login Success",
        description: "Welcome to devMusic",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      history.push("/");
      return res;
    });
  };

  return (
    <div className="fondo">
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color="white">Login to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="text"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: valEmail,
                      message: "Invalid email address",
                    },
                  })}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="password" isInvalid={errors.password} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                    minLength: {
                      value: 5,
                      message: "Minimum length should be 5",
                    },
                  })}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"#ffcd1f"}
                  color={"black"}
                  _hover={{
                    bg: "#ffcd1f.400",
                    border: "1px solid grey",
                  }}
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                    border: "1px solid grey",
                  }}
                  leftIcon={<AiFillFacebook />}
                >
                  Login with Facebook
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </div>

  );
}
