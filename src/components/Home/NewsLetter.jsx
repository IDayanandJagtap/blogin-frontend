import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef } from "react";

const NewsLetter = () => {
    const toast = useToast();
    const emailRef = useRef(0);

    const subscribe = async () => {
        try {
            const email = emailRef.current.value;
            const response = await axios.post(
                "https://blogin-kpp7.onrender.com/api/subscribe",
                // "http://localhost:8000/api/subscribe",
                {
                    email: email,
                }
            );

            const msg = response.data.data;
            toast({
                title: msg + " 😄",
                status: "success",
                isClosable: "true",
                position: "top",
            });
        } catch (err) {
            console.log(err);
            const msg = err.response.data.error.errors[0].msg;
            console.log(msg);
            toast({
                title: msg,
                status: "error",
                isClosable: "true",
                position: "top",
            });
        }
        emailRef.current.value = "";
    };

    return (
        <Box
            maxW={[
                "container.sm",
                "container.sm",
                "container.md",
                "container.lg",
                "container.xl",
            ]}
            bgColor={"purple.600"}
            mx={["20px", "8%", "auto", "auto", "auto"]}
            py={8}
            mb={24}
            borderRadius={"lg"}
            boxShadow={"lg"}
        >
            <VStack color={"whiteAlpha.800"} gap={6} my={8} px={2}>
                <Heading
                    as={"h1"}
                    fontSize={["xl", "2xl", "3xl", "4xl"]}
                    letterSpacing={2}
                    textAlign={"center"}
                >
                    Subscribe to our news letter
                </Heading>
                <Text textAlign={"center"} lineHeight={2} letterSpacing={1.5}>
                    {" "}
                    Join us to get updates on what's going on in the world!{" "}
                    <br />
                    The best articles right in your inbox.
                </Text>
            </VStack>
            <VStack my={8} pt={10} w={["95%", "95%", "80%", "50%"]} mx={"auto"}>
                <InputGroup>
                    <Input
                        type="email"
                        variant={"flushed"}
                        placeholder="Enter your email..."
                        color={"whiteAlpha.800"}
                        outline={"none"}
                        focusBorderColor="white"
                        fontSize={["sm", "md", "lg"]}
                        ref={emailRef}
                        p={3}
                    ></Input>
                    <InputRightElement w={["5rem", "6rem"]}>
                        <Button
                            variant={"ghost"}
                            colorScheme=""
                            color={"white"}
                            onClick={subscribe}
                        >
                            Subscribe
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </VStack>
        </Box>
    );
};

export default NewsLetter;
