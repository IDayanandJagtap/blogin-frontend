import { Box, Stack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import googlePlayImg from "../assets/googlePlay.png";
import appStoreImg from "../assets/appStore.png";

const Footer = () => {
    return (
        <Box maxW={"full"} bgColor={"gray.100"} p={8}>
            <Stack
                w={"full"}
                flexDirection={["column", "column", "column", "row"]}
                justifyContent={[
                    "flex-start",
                    "flex-start",
                    "flex-start",
                    "space-between",
                ]}
                alignItems={["flex-start"]}
                gap={[12, 12, 12, 0]}
            >
                <VStack alignItems={"flex-start"} w={"full"}>
                    <Text
                        fontWeight={"semibold"}
                        fontSize={["2xl", "3xl", "4xl"]}
                        mb={2}
                    >
                        Blogin
                    </Text>
                    <Text letterSpacing={1.2} wordBreak={"break"}>
                        Spread your thoughts ! <br></br>We believe in your
                        knowledge. Do you ?
                    </Text>
                </VStack>

                {/* Quick Links */}
                <VStack
                    w={"full"}
                    alignItems={[
                        "flex-start",
                        "flex-start",
                        "flex-start",
                        "center",
                    ]}
                >
                    <Text
                        fontWeight={"semibold"}
                        fontSize={["2xl", "3xl", "4xl"]}
                        mb={2}
                    >
                        {" "}
                        Quick Links
                    </Text>
                    <VStack
                        alignItems={[
                            "flex-start",
                            "flex-start",
                            "flex-start",
                            "center",
                        ]}
                    >
                        <Text _hover={{ color: "purple.500" }}>
                            <Link to={"/"}>Home</Link>
                        </Text>
                        <Text _hover={{ color: "purple.500" }}>
                            <Link to={"/post"}>Post</Link>
                        </Text>
                        <Text _hover={{ color: "purple.500" }}>
                            <Link to={"#about"}>About</Link>
                        </Text>
                        <Text _hover={{ color: "purple.500" }}>
                            <Link to={"/contact"}>Contact</Link>
                        </Text>
                    </VStack>
                </VStack>

                {/* More links */}
                <VStack
                    w={"full"}
                    alignItems={[
                        "flex-start",
                        "flex-start",
                        "flex-start",
                        "center",
                    ]}
                >
                    <Text
                        fontWeight={"semibold"}
                        fontSize={["2xl", "3xl", "4xl"]}
                        mb={2}
                    >
                        More
                    </Text>
                    <VStack
                        w={"full"}
                        alignItems={[
                            "flex-start",
                            "flex-start",
                            "flex-start",
                            "center",
                        ]}
                    >
                        <Text
                            borderBottom={"1px solid gray"}
                            w={["20%", "20%", "20%", "50%"]}
                            textAlign={["left", "left", "left", "center"]}
                            pb={3}
                            _hover={{ color: "purple.500" }}
                        >
                            <Link to={"#"}>FAQ'S</Link>
                        </Text>
                        <Text _hover={{ color: "purple.500" }}>
                            <Link to={"#"}>Documentation</Link>
                        </Text>
                        <Text _hover={{ color: "purple.500" }}>
                            <Link to={"#"}>API</Link>
                        </Text>
                    </VStack>
                </VStack>

                {/* App links */}
                <VStack
                    w={"full"}
                    alignItems={[
                        "flex-start",
                        "flex-start",
                        "flex-start",
                        "center",
                    ]}
                >
                    <Text fontSize={"2xl"} fontWeight={"semibold"}>
                        Get us on{" "}
                    </Text>
                    <Link to="#">
                        <Image
                            src={googlePlayImg}
                            borderRadius={"md"}
                            w={40}
                            cursor={"pointer"}
                            transition={"transform 0.4s"}
                            _hover={{ transform: "scale(1.1)" }}
                        ></Image>
                    </Link>

                    <Link to={"#"}>
                        <Image
                            src={appStoreImg}
                            borderRadius={"md"}
                            w={40}
                            cursor={"pointer"}
                            transition={"transform 0.4s"}
                            _hover={{ transform: "scale(1.1)" }}
                        ></Image>
                    </Link>
                </VStack>
            </Stack>
        </Box>
    );
};

export default Footer;
