import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import blogImage from "../../assets/blog.jpg";
import { FcCheckmark } from "react-icons/fc";
const About = () => {
    return (
        <Box
            id="about"
            maxW={[
                "container.sm",
                "container.sm",
                "container.md",
                "container.lg",
                "container.xl",
            ]}
            mx={["20px", "8%", "auto", "auto", "auto"]}
            my={20}
            borderRadius={"lg"}
            py={8}
        >
            <VStack gap={8}>
                <Heading
                    as="h2"
                    letterSpacing={2}
                    display={["none", "none", "block"]}
                >
                    About{" "}
                </Heading>
                <HStack w={"95%"} mx={"auto"} justifyContent={"space-between"}>
                    <VStack alignItems={"flex-start"} fontSize={"lg"}>
                        <Text
                            fontSize={"4xl"}
                            textAlign={["center", "center", "left"]}
                            w={"full"}
                        >
                            Blogin
                        </Text>
                        <Text
                            fontSize={"lg"}
                            textAlign={["center", "center", "left"]}
                            w={"full"}
                        >
                            We provide you a free and user friendly platform to
                            create and read blogs.
                        </Text>
                        <HStack h={8}></HStack>
                        <HStack>
                            <FcCheckmark /> <Text> 24/7 open</Text>
                        </HStack>
                        <HStack>
                            <FcCheckmark />
                            <Text> Share across the world.</Text>
                        </HStack>
                        <HStack>
                            <FcCheckmark />
                            <Text> Explore content of vast categories.</Text>
                        </HStack>
                    </VStack>
                    <Image
                        src={blogImage}
                        width={"40%"}
                        borderRadius={"md"}
                        display={["none", "none", "block"]}
                    ></Image>
                </HStack>
            </VStack>
        </Box>
    );
};

export default About;
