import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import bgImage from "../assets/bg-1.jpg";
import home1 from "../assets/home2.png";
import RecentPosts from "./Home/RecentPosts";
import NewsLetter from "./Home/NewsLetter";
import About from "./Home/About";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "header/setActiveTab",
            payload: "/",
        });
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <Box
                maxW={"100vw"}
                minH={"100vh"}
                bgImage={bgImage}
                display={"grid"}
                gridTemplateColumns={"1fr 1fr"}
                alignItems={"center"}
                pt={20}
            >
                <Stack
                    w={["100vw", "100vw", "100%"]}
                    pl={["4", "4", "16"]}
                    p={4}
                    textAlign={["center", "center", "left"]}
                >
                    <Text
                        fontSize={["3xl", "4xl", "5xl"]}
                        color={"whiteAlpha.900"}
                        wordBreak={"break"}
                        fontWeight={"semibold"}
                        letterSpacing={1.2}
                        wordSpacing={4}
                    >
                        SPREAD{" "}
                        <Text as="span" color="pink.500">
                            YOUR
                        </Text>{" "}
                        THOUGHTS
                    </Text>
                    <br />
                    <Text
                        fontSize={["3xl", "4xl", "5xl"]}
                        color={"whiteAlpha.900"}
                        wordBreak={"break"}
                        fontWeight={"semibold"}
                        letterSpacing={1.2}
                        wordSpacing={4}
                    >
                        WE{" "}
                        <Text as={"span"} color="pink.500">
                            BELIEVE
                        </Text>{" "}
                        IN YOUR KNOWLEDGE!
                    </Text>
                </Stack>
                <motion.div
                    style={{
                        height: "80%",
                        width: "100%",
                        marginTop: "40px",
                    }}
                    animate={{ translateY: "10px" }}
                    transition={{
                        ease: "linear",
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <HStack
                        width={"100%"}
                        height={"100%"}
                        display={["none", "none", "flex"]}
                        justifyContent={"center"}
                        className="headerImg"
                    >
                        <Image
                            src={home1}
                            width={["100%", "100%", "80%", "60%", "50%"]}
                            id="headerImg"
                        />
                    </HStack>
                </motion.div>
            </Box>
            <Box>
                <About />
                <RecentPosts />
                <NewsLetter />
            </Box>
        </>
    );
};

export default Home;
