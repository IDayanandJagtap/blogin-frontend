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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { BiSolidMessageSquare, BiSolidFile, BiSolidCog } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserDrawer = ({ openUserBar, setOpenUserBar }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

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
                    <DrawerHeader>Hello, user</DrawerHeader>

                    <DrawerBody>
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
                        >
                            New post
                        </Button>

                        <Divider mt={4} />

                        <VStack w={"full"} alignItems={"stretch"} mt={2}>
                            <Link>
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
                            <Link>
                                <HStack
                                    w={"full"}
                                    p="3"
                                    borderRadius={"md"}
                                    _hover={{ backgroundColor: "#ebf1f7" }}
                                >
                                    <BiSolidMessageSquare size={24} />
                                    <Text
                                        as={"span"}
                                        fontSize={"lg"}
                                        fontWeight={"semibold"}
                                    >
                                        Comments
                                    </Text>
                                </HStack>
                            </Link>
                            <Link>
                                <HStack
                                    w={"full"}
                                    p="3"
                                    borderRadius={"md"}
                                    _hover={{ backgroundColor: "#ebf1f7" }}
                                >
                                    <BiSolidCog size={24} />
                                    <Text
                                        as={"span"}
                                        fontSize={"lg"}
                                        fontWeight={"semibold"}
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
