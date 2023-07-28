import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [scrolled, setScrolled] = useState(0);

    useState(() => {
        const handleScroll = (e) => {
            if (window.scrollY) setScrolled(1);
            else setScrolled(0);
        };
        window.addEventListener("scroll", handleScroll);
    }, []);

    const handleOnSignupClick = () => {
        setOpenModal(true);
    };

    return (
        <header>
            <Box
                w={"100vw"}
                position={"fixed"}
                top={0}
                left={0}
                bgColor={scrolled ? "white" : "transparent"}
                boxShadow={scrolled ? "lg" : ""}
            >
                <nav>
                    <HStack justifyContent={"space-between"} p={4}>
                        <Heading
                            as={"h1"}
                            fontFamily={"cursive"}
                            color={scrolled ? "blak" : "white"}
                        >
                            Blogin
                        </Heading>
                        <HStack gap={8} color={scrolled ? "blak" : "white"}>
                            <Link to={"/"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={2}
                                    borderBottom={"3px solid transparent"}
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                >
                                    Home
                                </Text>
                            </Link>
                            <Link to={"/"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={2}
                                    borderBottom={"3px solid transparent"}
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                >
                                    Posts
                                </Text>
                            </Link>
                            <Link to={"/"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={2}
                                    borderBottom={"3px solid transparent"}
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                >
                                    Post
                                </Text>
                            </Link>

                            <Button
                                colorScheme="purple"
                                mx={4}
                                onClick={handleOnSignupClick}
                            >
                                Login
                            </Button>
                        </HStack>
                    </HStack>
                </nav>
            </Box>

            <Authentication openModal={openModal} setOpenModal={setOpenModal} />
        </header>
    );
};

export default Header;
