import React, { useEffect, useState } from "react";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    VStack,
    Text,
    Stack,
    Flex,
    useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../redux/authSlice";

const Authentication = ({ openModal, setOpenModal }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectLogin, setSelectLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        isError: false,
    });
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        confirm_password: "",
        passError: false,
    });
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        if (openModal) onOpen();
        setOpenModal(false);
        //eslint-disable-next-line
    }, [openModal]);

    const handleOnClose = () => {
        setOpenModal(false);
        onClose();
        // Set all errors to false;
        setLoginData({ isError: false });
        setSignupData({ passError: false });
    };

    const handleSwitchToLogin = () => {
        if (!selectLogin) setSelectLogin(true);
    };

    const handleSwitchToSignup = () => {
        if (selectLogin) setSelectLogin(false);
    };

    const handleLogin = async () => {
        // Thunk always retuns a fullfilled promise so we need to unwrap it first.
        dispatch(loginUser(loginData))
            .unwrap()
            .then((e) => {
                setLoginData({ ...loginData, isError: false });
                handleOnClose();
                toast({
                    title: "Logged in successfully 😃",
                    status: "success",
                    isClosable: "true",
                    position: "top",
                });
            })
            .catch((err) => {
                setLoginData({ ...loginData, isError: true });
            });
    };

    const handleSignup = () => {
        // Validate password :
        if (signupData.password !== signupData.confirm_password) {
            setSignupData({ ...signupData, passError: true });
            return;
        }

        //Dispatch the signup function.
        dispatch(signupUser(signupData))
            .unwrap()
            .then(() => {
                setSignupData({ ...signupData, passError: false });
                handleOnClose();
                toast({
                    title: "Account created successfully 😃",
                    status: "success",
                    isClosable: "true",
                    position: "top",
                });
            })
            .catch((err) => {
                // console.log(err);
                // setSignupData({ ...signupData, passError: true });
                toast({
                    title: "Error creating account 🙁",
                    status: "error",
                    isClosable: "true",
                    position: "top",
                });
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleOnClose}
            size={["xs", "sm", "md"]}
            isCentered={1}
        >
            {/* <Button onClick={onOpen} ref={btnRef} clicked={openModal}></Button> */}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton
                    tabIndex={-1}
                    onClick={() => setOpenModal(false)}
                />
                <ModalBody transition={"all 0.7s"}>
                    <Flex
                        justifyContent={"space-between"}
                        cursor={"pointer"}
                        mb={5}
                    >
                        <Stack
                            w={"full"}
                            py={2}
                            borderBottom={
                                selectLogin ? "2px solid purple" : "none"
                            }
                            bgColor={selectLogin ? "none" : "purple.100"}
                            opacity={selectLogin ? 1 : 0.6}
                            _hover={{ opacity: !selectLogin && 1 }}
                            transition={"all 0.3s"}
                            onClick={handleSwitchToLogin}
                        >
                            <Text
                                textAlign={"center"}
                                fontSize={"2xl"}
                                fontWeight={"500"}
                            >
                                Login
                            </Text>
                        </Stack>
                        <Stack
                            w={"full"}
                            py={2}
                            borderBottom={
                                !selectLogin ? "2px solid purple" : "none"
                            }
                            bgColor={!selectLogin ? "none" : "purple.100"}
                            opacity={!selectLogin ? 1 : 0.6}
                            _hover={{ opacity: selectLogin && 1 }}
                            transition={"all 0.3s"}
                            onClick={handleSwitchToSignup}
                        >
                            <Text
                                textAlign={"center"}
                                fontSize={"2xl"}
                                fontWeight={"500"}
                            >
                                Signup
                            </Text>
                        </Stack>
                    </Flex>

                    {selectLogin ? (
                        <Login
                            loginData={loginData}
                            setLoginData={setLoginData}
                        />
                    ) : (
                        <Signup
                            signupData={signupData}
                            setSignupData={setSignupData}
                        />
                    )}
                </ModalBody>

                <ModalFooter>
                    {selectLogin ? (
                        <VStack gap={3} w={"full"}>
                            <Button
                                variant={"solid"}
                                colorScheme="purple"
                                alignSelf={"flex-end"}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                            <Text fontSize={"sm"} textAlign={"center"}>
                                Don't have an account ?{" "}
                                <Button
                                    variant={"link"}
                                    colorScheme="purple"
                                    onClick={handleSwitchToSignup}
                                >
                                    Signup here
                                </Button>
                            </Text>
                        </VStack>
                    ) : (
                        <VStack gap={3} w={"full"}>
                            <Button
                                variant={"solid"}
                                colorScheme="purple"
                                alignSelf={"flex-end"}
                                onClick={handleSignup}
                            >
                                Signup
                            </Button>
                            <Text fontSize={"sm"} textAlign={"center"}>
                                Already have an account ?{" "}
                                <Button
                                    variant={"link"}
                                    colorScheme="purple"
                                    onClick={handleSwitchToLogin}
                                >
                                    Login here
                                </Button>
                            </Text>
                        </VStack>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Authentication;
