import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    HStack,
    Heading,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [scrolled, setScrolled] = useState(0);
    const [currentUrlPath, setCurrentUrlPath] = useState(
        window.location.pathname
    );

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Handle styles on scroll !
    const handleScroll = () => {
        if (window.scrollY === 0 && currentUrlPath === "/") setScrolled(0);
        else setScrolled(1);
    };
    // Add event listener to handle scroll      // ******************** It can be optimised but make to sure to create a branch first!
    window.addEventListener("scroll", handleScroll);

    useEffect(() => {
        handleScroll();
        //eslint-disable-next-line
    }, [currentUrlPath]);

    // handle login button click
    const handleOnLoginClick = () => {
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
                zIndex={3}
            >
                <nav>
                    <HStack justifyContent={"space-between"} p={4}>
                        <Heading
                            as={"h1"}
                            fontFamily={"cursive"}
                            color={scrolled ? "black" : "white"}
                            ml={[2, 2, 10]}
                        >
                            Blogin
                        </Heading>

                        {/* Display none before md breakpoint */}
                        <HStack
                            gap={8}
                            color={scrolled ? "black" : "white"}
                            display={["none", "none", "flex"]}
                        >
                            <Link to={"/"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={2}
                                    borderBottom={
                                        currentUrlPath === "/"
                                            ? "3px solid #805ad5"
                                            : "3px solid transparent"
                                    }
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                    onClick={() => setCurrentUrlPath("/")}
                                >
                                    Home
                                </Text>
                            </Link>
                            <Link to={"/posts"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={2}
                                    borderBottom={
                                        currentUrlPath === "/posts"
                                            ? "3px solid #805ad5"
                                            : "3px solid transparent"
                                    }
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                    onClick={() => setCurrentUrlPath("/posts")}
                                >
                                    Posts
                                </Text>
                            </Link>
                            <Link to={"/post"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={1}
                                    borderBottom={
                                        currentUrlPath === "/post"
                                            ? "3px solid #805ad5"
                                            : "3px solid transparent"
                                    }
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                    onClick={() => setCurrentUrlPath("/post")}
                                >
                                    Post
                                </Text>
                            </Link>

                            <Button
                                colorScheme="purple"
                                ml={2}
                                mr={10}
                                onClick={handleOnLoginClick}
                                px={6}
                            >
                                Login
                            </Button>
                        </HStack>

                        {/* Display only before md breakpoint and then hide it */}
                        <HStack
                            display={["flex", "flex", "none", "none", "none"]}
                            alignItems={"center"}
                        >
                            <HiOutlineMenuAlt3
                                size={"32"}
                                onClick={onOpen}
                                color={scrolled ? "black" : "white"}
                            />
                        </HStack>
                    </HStack>
                </nav>
            </Box>

            {/* Authentication Modal */}
            <Authentication openModal={openModal} setOpenModal={setOpenModal} />

            {/* Side drawer (ham menu) */}
            <SideDrawer
                isOpen={isOpen}
                onClose={onClose}
                handleOnLoginClick={handleOnLoginClick}
                currentUrlPath={currentUrlPath}
                setCurrentUrlPath={setCurrentUrlPath}
            />
        </header>
    );
};

const SideDrawer = ({
    isOpen,
    onClose,
    handleOnLoginClick,
    currentUrlPath,
    setCurrentUrlPath,
}) => (
    <>
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            colorScheme={"purple"}
            size={"full"}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton size={"xl"} pt={4} pr={2} />

                <DrawerBody>
                    <VStack h={"full"} justifyContent={"center"} gap={12}>
                        <Link to={"/"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                color={
                                    currentUrlPath === "/"
                                        ? "purple.500"
                                        : "black"
                                }
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={() => {
                                    setCurrentUrlPath("/");
                                    onClose();
                                }}
                            >
                                Home
                            </Text>
                        </Link>
                        <Link to={"/posts"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                color={
                                    currentUrlPath === "/posts"
                                        ? "purple.500"
                                        : "black"
                                }
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={() => {
                                    setCurrentUrlPath("/posts");
                                    onClose();
                                }}
                            >
                                Posts
                            </Text>
                        </Link>
                        <Link to={"/post"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                color={
                                    currentUrlPath === "/post"
                                        ? "purple.500"
                                        : "black"
                                }
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={() => {
                                    setCurrentUrlPath("/post");
                                    onClose();
                                }}
                            >
                                Post
                            </Text>
                        </Link>
                    </VStack>
                </DrawerBody>

                <DrawerFooter display={"flex"} justifyContent={"center"}>
                    <Button
                        colorScheme="purple"
                        onClick={() => {
                            handleOnLoginClick();
                            onClose();
                        }}
                        px={6}
                        mb={28}
                    >
                        Login
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
);

export default Header;
