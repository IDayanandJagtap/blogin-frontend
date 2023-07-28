import React, { useState, useRef } from "react";
import {
    Input,
    VStack,
    FormLabel,
    FormControl,
    InputGroup,
    InputRightElement,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const Signup = ({ signupData, setSignupData }) => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false);
            passwordRef.current.type = "password";
            passwordRef.current.placeholder = "********";
        } else {
            setShowPassword(true);
            passwordRef.current.type = "text";
            passwordRef.current.placeholder = "password";
        }
    };

    const setFormData = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <form method="">
            <VStack gap={5} alignContent={"flex-start"}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        focusBorderColor={"purple"}
                        placeholder="John Doe"
                        name="name"
                        onChange={setFormData}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        focusBorderColor={"purple"}
                        placeholder="john@doe.com"
                        name="email"
                        onChange={setFormData}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <InputGroup>
                            <Input
                                type="password"
                                focusBorderColor={"purple"}
                                placeholder="********"
                                name="password"
                                onChange={setFormData}
                                ref={passwordRef}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    colorScheme="whiteAlpha"
                                    color={"black"}
                                    opacity={0.7}
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? (
                                        <RiEyeFill size={20} />
                                    ) : (
                                        <RiEyeCloseFill size={20} />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </InputGroup>
                </FormControl>
                <FormControl isInvalid={signupData.passError}>
                    <FormLabel>Confirm password</FormLabel>
                    <Input
                        type="password"
                        focusBorderColor={"purple"}
                        placeholder="********"
                        name="confirm_password"
                        onChange={setFormData}
                    />
                    <FormErrorMessage>
                        Password and confirm password must be same.
                    </FormErrorMessage>
                </FormControl>
            </VStack>
        </form>
    );
};

export default Signup;
