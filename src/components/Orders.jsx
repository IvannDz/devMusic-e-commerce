import React, { useState, useEffect } from "react";
import {
  chakra,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import axios from "axios";

export default function Orders() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/auth/me/buyOrder")
      .then((resp) => resp.data)
      .then((ordenes) => setOrders(ordenes));
  }, []);

  const data = orders;
  console.log("data", data);

  const productos= data.map((ordenes) =>{
    return ordenes.order.products.map((product) =>  product.name)
  })

  console.log(productos)

  
  return (
    <Flex
      w="full"
      bg="gray.600"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={{ base: "column" }} w="full" bg="white" shadow="lg">
        <Flex direction={{ base: "row", md: "column" }} bg="grey">
          <SimpleGrid
            spacingY={3}
            columns={{ base: 1, md: 3 }}
            w="full"
            py={2}
            px={10}
            fontWeight="hairline"
          >
            <span>ID</span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              PRICE
            </chakra.span>
          </SimpleGrid>
        </Flex>

        {data.map((orden, pid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg="white"
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 3 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{orden.buyOrderId}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {orden.order.total}
                </chakra.span>

                <>
                  <Button onClick={onOpen}>View Order</Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        

                        <Text>Hola</Text>
                        <Text>Hola</Text>

                       
                        
                        {orden.order.products.map((element) =>{
                          // console.log(element)
                          return (<Text>{element.name}</Text>)
                        }
                        )}
                      
                        
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}

//  {/* {orden.buyOrderId? (orden.order.products.forEach((element) =>(
//                       <Text>{element}</Text>
//                     )))
//                     :(console.log("hola"))} */}