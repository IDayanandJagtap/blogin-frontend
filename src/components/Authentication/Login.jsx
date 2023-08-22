import React, { useRef, useState } from "react";
import {
    Input,
    VStack,
    FormLabel,
    FormControl,
    InputRightElement,
    Button,
    InputGroup,
    HStack,
    Text,
} from "@chakra-ui/react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const Login = ({ loginData, setLoginData }) => {
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
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <form method="">
            <VStack gap={5} alignContent={"flex-start"}>
                {loginData.isError && (
                    <HStack
                        bgColor={"red.200"}
                        w={"full"}
                        py={2}
                        px={4}
                        borderRadius={"md"}
                    >
                        <Text>Invalid credentials</Text>
                    </HStack>
                )}
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        focusBorderColor={"purple"}
                        placeholder="john@doe.com"
                        name="email"
                        autoComplete="true"
                        // value={loginData.email}
                        onChange={setFormData}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type="password"
                            focusBorderColor={"purple"}
                            placeholder="********"
                            name="password"
                            autoComplete="true"
                            ref={passwordRef}
                            // value={loginData.password}
                            onChange={setFormData}
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
                </FormControl>
            </VStack>
        </form>
    );
};

export default Login;
