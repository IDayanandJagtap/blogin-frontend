import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";

const NewsLetter = () => {
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
            <VStack my={8} pt={10} w={["90%", "90%", "80%", "50%"]} mx={"auto"}>
                <InputGroup>
                    <Input
                        type="email"
                        variant={"flushed"}
                        placeholder="Enter your email..."
                        color={"whiteAlpha.800"}
                        outline={"none"}
                        focusBorderColor="white"
                        fontSize={"lg"}
                        p={3}
                    ></Input>
                    <InputRightElement w={"6rem"}>
                        <Button
                            variant={"ghost"}
                            colorScheme=""
                            color={"white"}
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
