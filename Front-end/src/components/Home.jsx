import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import bgImage from "../assets/bg-1.jpg";
import home1 from "../assets/home1.png";

const Home = () => {
    return (
        <>
            <Box
                maxW={"100vw"}
                minH={"100vh"}
                bgImage={bgImage}
                display={"grid"}
                gridTemplateColumns={"1fr 1fr"}
                alignItems={"center"}
            >
                <Stack border={"1px solid white"} w={"100%"}>
                    <Text>Hello world </Text>
                </Stack>
                <HStack width={"100%"} mt={10}>
                    <Image src={home1} width={"80%"} ml={32} />
                </HStack>
            </Box>
            <Box minH={"90vh"}></Box>
        </>
    );
};

export default Home;
