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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [scrolled, setScrolled] = useState(0);

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    useState(() => {
        const handleScroll = (e) => {
            if (window.scrollY) setScrolled(1);
            else setScrolled(0);
        };
        window.addEventListener("scroll", handleScroll);
    }, []);

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
                zIndex={1}
            >
                <nav>
                    <HStack justifyContent={"space-between"} p={4}>
                        <Heading
                            as={"h1"}
                            fontFamily={"cursive"}
                            color={scrolled ? "black" : "white"}
                            ml={10}
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
                                    px={1}
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
                                ref={btnRef}
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
                btnRef={btnRef}
                isOpen={isOpen}
                onClose={onClose}
                handleOnLoginClick={handleOnLoginClick}
            />
        </header>
    );
};

const SideDrawer = ({ btnRef, isOpen, onClose, handleOnLoginClick }) => (
    <>
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            colorScheme={"purple"}
            size={"full"}
        >
            <DrawerOverlay closeOnOverlayClick={true} />
            <DrawerContent>
                <DrawerCloseButton size={"xl"} pt={4} pr={2} />

                <DrawerBody>
                    <VStack h={"full"} justifyContent={"center"} gap={12}>
                        <Link to={"/"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={onClose}
                            >
                                Home
                            </Text>
                        </Link>
                        <Link to={"/"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={onClose}
                            >
                                Posts
                            </Text>
                        </Link>
                        <Link to={"/"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={onClose}
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
