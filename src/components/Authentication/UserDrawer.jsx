import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    HStack,
    Divider,
    VStack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { BiSolidFile, BiSolidCog } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserDrawer = ({ openUserBar, setOpenUserBar }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (openUserBar) onOpen();
        else setOpenUserBar(false);
    });

    const handleClose = () => {
        setOpenUserBar(false);
        onClose();
    };
    return (
        <>
            <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{userInfo.name}</DrawerHeader>

                    <DrawerBody>
                        <Link to={"/post"}>
                            <Button
                                leftIcon={<HiPlus />}
                                variant={"solid"}
                                color={"purple.600"}
                                fontSize={"xl"}
                                colorScheme="gray"
                                py={6}
                                px={4}
                                borderRadius={"full"}
                                w={"full"}
                                onClick={handleClose}
                            >
                                New post
                            </Button>
                        </Link>

                        <Divider mt={4} />

                        <VStack w={"full"} alignItems={"stretch"} mt={2}>
                            <Link to={"/posts"} onClick={handleClose}>
                                <HStack
                                    w={"full"}
                                    p="3"
                                    borderRadius={"md"}
                                    _hover={{ backgroundColor: "#ebf1f7" }}
                                >
                                    <BiSolidFile size={24} />
                                    <Text
                                        as={"span"}
                                        fontSize={"lg"}
                                        fontWeight={"semibold"}
                                    >
                                        Posts
                                    </Text>
                                </HStack>
                            </Link>
                            <Link onClick={handleClose}>
                                <HStack
                                    w={"full"}
                                    p="3"
                                    borderRadius={"md"}
                                    // _hover={{ backgroundColor: "#ebf1f7" }}
                                >
                                    <BiSolidCog size={24} color="gray" />
                                    <Text
                                        as={"span"}
                                        fontSize={"lg"}
                                        fontWeight={"semibold"}
                                        color={"gray.500"}
                                    >
                                        Settings
                                    </Text>
                                </HStack>
                            </Link>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter mb={5}>
                        <HStack w={"full"} justifyContent={"center"}>
                            <Button
                                colorScheme="purple"
                                variant={"outline"}
                                onClick={() => {
                                    handleClose();
                                    dispatch({ type: "auth/logout" });
                                    navigate("/");
                                    toast({
                                        title: "Logged out !",
                                        status: "warning",
                                        isClosable: "true",
                                        position: "top",
                                    });
                                }}
                            >
                                Logout
                            </Button>
                        </HStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default UserDrawer;
