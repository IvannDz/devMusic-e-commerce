import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  chakra,
  Flex,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";

export default function Component() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/cart`)
      .then((resp) => {
        console.log("resp carrito completo", resp);
        return resp.data;
      })
      .then((products) => setProducts(products));
  }, []);

  const data = products;


  return (
    <Flex
      w="full"
      bg="gray.600"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={{ base: "column" }} w="full" bg="gray.800" shadow="lg">
        <SimpleGrid
          spacingY={3}
          columns={{ base: 1, md: 3 }}
          w={{ base: 120, md: "full" }}
          textTransform="uppercase"
          bg="gray.100"
          color="gray.500"
          py={{ base: 1, md: 4 }}
          px={{ base: 2, md: 10 }}
          fontSize="md"
          fontWeight="hairline"
          display="table-header-group"
        >
          <chakra.span textAlign={{ md: "right" }}>Product Name</chakra.span>
          
        </SimpleGrid>

        {data.map((product, pid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg="white"
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 4 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >

                <span>{product.name}</span>
                <span>{product.cantidad}</span>
                
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {product.price * product.cantidad}
                </chakra.span>
              
                <Flex justify={{ md: "end" }}>
                  <Button 
                  variant="solid" 
                  colorScheme="red" 
                  size="sm"
               
                >
                    Delete
                  </Button>

                  <Button 
                  variant="solid" 
                  colorScheme="green" 
                  size="sm"
                  onClick={()=>{  
                    return axios
                    .post(`/api/cart`, {id:product.id ,price:product.price})
                    .then((resp)=> {console.log(resp)
                      return resp.data})
                      .then(()=>{ 
                        axios
                        .get(`/api/cart`)
                        .then((resp) => resp.data)
                        .then((products) => setProducts(products));
                      })
                      
                    
                  }
                    
                    }
                  >
                    +
                  </Button>

                  <Button 
                  variant="solid" 
                  colorScheme="red" 
                  size="sm"
                  onClick={()=>{  
                    axios
                    .delete(`/api/cart`,{data:{idProduct:product.id, price:product.price}})
                    .then((resp)=>resp.data)
                    .then(()=>{ 
                      axios
                      .get(`/api/cart`)
                      .then((resp) => resp.data)
                      .then((products) => setProducts(products));
                    })
                  }
                    
                    }>
                    -
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      
      <Stack direction={{ base: "column" }} w="full" bg="gray.800" shadow="lg">
        <SimpleGrid
          spacingY={3}
          columns={{ base: 1, md: 3 }}
          w={{ base: 120, md: "full" }}
          textTransform="uppercase"
          bg="gray.100"
          color="gray.500"
          py={{ base: 1, md: 4 }}
          px={{ base: 2, md: 10 }}
          fontSize="md"
          fontWeight="hairline"
          display="table-header-group"
        >
          <chakra.span textAlign={{ md: "right" }}>hola</chakra.span>
          
        </SimpleGrid>
        </Stack>
      </Stack>
    </Flex>
  );
}






// import {
//   chakra,
//   Flex,
//   Icon,
//   useColorModeValue,
//   Button,
//   useBreakpointValue,
//   Stack,
//   SimpleGrid,
//   ButtonGroup,
//   IconButton,
// } from "@chakra-ui/react";
// import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
// import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

// export default function Component() {
//    const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`/api/cart`)
//       .then((resp) => {
//         console.log("resp carrito", resp.data);
//         return resp.data;
//       })
//       .then((products) => setProducts(products));
//   }, []);

//   const data = products;
//   return (
//     <Flex
//       w="full"
//       bg="gray.600"
//       p={50}
//       alignItems="center"
//       justifyContent="center"
//     >
//       <Stack
//         direction={{ base: "column" }}
//         w="full"
//         bg="white"
//         shadow="lg"
//       >
         
//          <SimpleGrid
//                   spacingY={3}
//                   columns={{ base: 1, md: 4 }}
//                   w={{ base: 120, md: "full" }}
//                   textTransform="uppercase"
//                   bg="gray.100"
//                   color="gray.500"
//                   py={{ base: 1, md: 4 }}
//                   px={{ base: 2, md: 10 }}
//                   fontSize="md"
//                   fontWeight="hairline"
//                   display="table-header-group"
//                 >
//                   <span>Name</span>
//                   <span>Created</span>
//                   <span>Data</span>
//                   <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
//                 </SimpleGrid>
//         {data.map((token, tid) => {
//           return (
//             <Flex
//               direction={{ base: "row", md: "column" }}
//               bg= "white"
//               key={tid}
//             >
             
              
//               <SimpleGrid
//                 spacingY={3}
//                 columns={{ base: 1, md: 4 }}
//                 w="full"
//                 py={2}
//                 px={10}
//                 fontWeight="hairline"
//               >
//                 <span>{token.name}</span>
//                 <chakra.span
//                   textOverflow="ellipsis"
//                   overflow="hidden"
//                   whiteSpace="nowrap"
//                 >
//                   {token.created}
//                 </chakra.span>
//                 <Flex>
//                   <Button
//                     size="sm"
//                     variant="solid"
//                     leftIcon={<Icon as={AiTwotoneLock} />}
//                     colorScheme="purple"
//                   >
//                     View Profile
//                   </Button>
//                 </Flex>
//                 <Flex justify={{ md: "end" }}>
//                   <ButtonGroup variant="solid" size="sm" spacing={3}>
//                     <IconButton
//                       colorScheme="blue"
//                       icon={<BsBoxArrowUpRight />}
//                     />
//                     <IconButton colorScheme="green" icon={<AiFillEdit />} />
//                     <IconButton
//                       colorScheme="red"
//                       variant="outline"
//                       icon={<BsFillTrashFill />}
//                     />
//                   </ButtonGroup>
//                 </Flex>
//               </SimpleGrid>
//             </Flex>
//           );
//         })}
//       </Stack>
//     </Flex>
//   );
// }