import {
    Avatar,
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
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import UserDrawer from "./Authentication/UserDrawer";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [scrolled, setScrolled] = useState(0);

    const { activeTab } = useSelector((state) => state.header);
    const dispatch = useDispatch();
    const toast = useToast();

    // For userDashboard
    //eslint-disable-next-line
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [openUserBar, setOpenUserBar] = useState(false);

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Handle styles on scroll !
    const handleScroll = () => {
        if (window.scrollY === 0 && activeTab === "/") setScrolled(0);
        else setScrolled(1);
    };
    // Add event listener to handle scroll      // ******************** It can be optimised but make to sure to create a branch first!
    window.addEventListener("scroll", handleScroll);

    useEffect(() => {
        handleScroll();
        //eslint-disable-next-line
    }, [activeTab]);

    // handle login button click
    const handleOnLoginClick = () => {
        setOpenModal(true);
    };

    // handle user avatar click
    const handleOnAvatarClick = () => {
        setOpenUserBar(true);
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
                                        activeTab === "/"
                                            ? "3px solid #805ad5"
                                            : "3px solid transparent"
                                    }
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                    onClick={() =>
                                        dispatch({
                                            type: "header/setActiveTab",
                                            payload: "/",
                                        })
                                    }
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
                                        activeTab === "/posts"
                                            ? "3px solid #805ad5"
                                            : "3px solid transparent"
                                    }
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                    onClick={() =>
                                        dispatch({
                                            type: "header/setActiveTab",
                                            payload: "/posts",
                                        })
                                    }
                                >
                                    Posts
                                </Text>
                            </Link>
                            {/* <Link to={"/post"}>
                                <Text
                                    fontSize={"lg"}
                                    fontWeight={"medium"}
                                    px={1}
                                    borderBottom={
                                        activeTab === "/post"
                                            ? "3px solid #805ad5"
                                            : "3px solid transparent"
                                    }
                                    _hover={{
                                        borderBottom: "3px solid #805ad5",
                                    }}
                                    onClick={() =>
                                        dispatch({
                                            type: "header/setActiveTab",
                                            payload: "/post",
                                        })
                                    }
                                >
                                    Post
                                </Text>
                            </Link> */}

                            {!userInfo.isLoggedIn ? (
                                <Button
                                    colorScheme="purple"
                                    ml={2}
                                    mr={10}
                                    onClick={handleOnLoginClick}
                                    px={6}
                                >
                                    Login
                                </Button>
                            ) : (
                                <Avatar
                                    ml={2}
                                    mr={10}
                                    bg="purple.600"
                                    size={"sm"}
                                    cursor={"pointer"}
                                    transform={"scale(1.1)"}
                                    transition={"all 0.3s"}
                                    _hover={{ transform: "scale(1.2)" }}
                                    icon={<AiOutlineUser fontSize="1.5rem" />}
                                    onClick={handleOnAvatarClick}
                                />
                            )}
                        </HStack>

                        {/* Display only before md breakpoint and then hide it */}
                        <HStack
                            display={["flex", "flex", "none", "none", "none"]}
                            alignItems={"center"}
                        >
                            {userInfo.isLoggedIn && (
                                <Avatar
                                    mx={4}
                                    bg="purple.600"
                                    size={"sm"}
                                    cursor={"pointer"}
                                    transform={"scale(1.1)"}
                                    transition={"all 0.3s"}
                                    _hover={{ transform: "scale(1.2)" }}
                                    icon={<AiOutlineUser fontSize="1.5rem" />}
                                    onClick={handleOnAvatarClick}
                                />
                            )}
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
                isLoggedIn={userInfo.isLoggedIn}
                handleOnLoginClick={handleOnLoginClick}
                activeTab={activeTab}
                dispatch={dispatch}
                toast={toast}
            />

            {/* user dashboard */}
            <UserDrawer
                openUserBar={openUserBar}
                setOpenUserBar={setOpenUserBar}
            />
        </header>
    );
};

const SideDrawer = ({
    isOpen,
    onClose,
    isLoggedIn,
    handleOnLoginClick,
    activeTab,
    dispatch,
    toast,
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
                <DrawerCloseButton size={"xl"} pt={4} pr={2} tabIndex={-1} />

                <DrawerBody>
                    <VStack h={"full"} justifyContent={"center"} gap={12}>
                        <Link to={"/"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                color={
                                    activeTab === "/" ? "purple.500" : "black"
                                }
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={() => {
                                    dispatch({
                                        type: "header/setActiveTab",
                                        payload: "/",
                                    });
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
                                    activeTab === "/posts"
                                        ? "purple.500"
                                        : "black"
                                }
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={() => {
                                    dispatch({
                                        type: "header/setActiveTab",
                                        payload: "/posts",
                                    });
                                    onClose();
                                }}
                            >
                                Posts
                            </Text>
                        </Link>
                        {/*<Link to={"/post"}>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"semibold"}
                                color={
                                    activeTab === "/post"
                                        ? "purple.500"
                                        : "black"
                                }
                                _hover={{
                                    color: "purple.500",
                                }}
                                onClick={() => {
                                    dispatch({
                                        type: "header/setActiveTab",
                                        payload: "/post",
                                    });
                                    onClose();
                                }}
                            >
                                Post
                            </Text>
                        </Link> */}
                    </VStack>
                </DrawerBody>

                <DrawerFooter display={"flex"} justifyContent={"center"}>
                    {!isLoggedIn ? (
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
                    ) : (
                        <Button
                            variant={"outline"}
                            colorScheme="purple"
                            onClick={() => {
                                console.log("clicked");
                                dispatch({ type: "auth/logout" });
                                onClose();
                                toast({
                                    title: "Logged out !",
                                    status: "warning",
                                    isClosable: "true",
                                    position: "top",
                                });
                            }}
                            px={6}
                            mb={28}
                        >
                            Logout
                        </Button>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
);

export default Header;
