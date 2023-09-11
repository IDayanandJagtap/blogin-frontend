import React, { useEffect, useRef, useState } from "react";
import TextEditor from "./TextEditor";
import {
    Box,
    Button,
    Divider,
    HStack,
    Heading,
    Input,
    VStack,
    useToast,
} from "@chakra-ui/react";
import RenderHtmlComponent from "./RenderHtmlComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePostToDb } from "../redux/postSlice";

const Post = () => {
    const toast = useToast();
    const [postData, setPostData] = useState(localStorage.getItem("post"));
    const [isPreview, setIsPreview] = useState(0);
    const titleRef = useRef(0);
    const dispatch = useDispatch();
    const { userToken, userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Show toast notification
    const showMobileToast = () => {
        setTimeout(() => {
            toast({
                title: "Use a big screen for better usability!",
                status: "info",
                position: "bottom",
                isClosable: true,
            });
        }, 2000);
    };

    const clearPost = () => {
        titleRef.current.value = "";
        localStorage.clear("post");
        setPostData(null);
    };

    const handleOnPostClick = () => {
        const title = titleRef.current.value;

        if (title.length < 3 || postData.length < 5) {
            toast({
                title: "The title/description should have min length",
                status: "warning",
                position: "bottom",
                isClosable: true,
            });
            return;
        }
        const data = {
            userToken: userToken,
            title: title,
            description: encodeURI(postData),
        };

        dispatch(savePostToDb(data))
            .unwrap()
            .then((e) => {
                toast({
                    title: "Post created successfully 🥳",
                    status: "success",
                    position: "bottom",
                    isClosable: true,
                });
                clearPost();
                // redirect the user to the myposts page !
                navigate("/");
            })
            .catch((e) => {
                toast({
                    title: "Something went wrong while creating post 😔",
                    status: "error",
                    position: "bottom",
                    isClosable: true,
                });
            });
    };

    useEffect(() => {
        // Set the header style
        dispatch({
            type: "header/setActiveTab",
            payload: "/post",
        });
        // Check if user is logged in.
        if (!userInfo.isLoggedIn) {
            navigate("/");
        }
        // Show alert if user is on smaller device.
        const screenWidth = window.screen.width;
        if (screenWidth < 468) showMobileToast();

        if (!localStorage.getItem("post"))
            localStorage.setItem(
                "post",
                JSON.stringify("Start writing here !")
            );

        // Scroll to top
        window.scrollTo(0, 0);

        // eslint-disable-next-line
    }, []);

    return (
        <Box w={"full"} minH={"75vh"}>
            <Box
                maxW={[
                    "container.sm",
                    "container.sm",
                    "container.md",
                    "container.lg",
                    "container.xl",
                ]}
                mx={["10px", "auto"]}
                mt={32}
                mb={20}
                border={"3px solid #805ad5"}
                borderRadius={"lg"}
            >
                <VStack w={"100%"} p={4}>
                    <Heading
                        as={"h4"}
                        fontSize={"2xl"}
                        textAlign={"start"}
                        w={"full"}
                    >
                        Post title :
                    </Heading>
                    <Input
                        type="text"
                        name="title"
                        ref={titleRef}
                        fontSize={"xl"}
                        placeholder="Post title..."
                        my={2}
                        mx={"auto"}
                        border={"2px solid #b1b1b1"}
                        focusBorderColor="#b1b1b1"
                    ></Input>
                </VStack>
                <Heading
                    as={"h4"}
                    fontSize={"2xl"}
                    textAlign={"start"}
                    w={"full"}
                    p={4}
                >
                    Description :
                </Heading>
                <TextEditor
                    postData={postData}
                    setPostData={setPostData}
                    isPreview={isPreview}
                    setIsPreview={setIsPreview}
                />
            </Box>
            {/* Here firstly I used && operator instead of ternary operator but it used to display the value of isPreview on the bottom left side of the editor */}
            {isPreview ? (
                <PreviewPost
                    postData={postData}
                    handleOnPostClick={handleOnPostClick}
                />
            ) : null}
        </Box>
    );
};

const PreviewPost = ({ postData, handleOnPostClick }) => (
    <Box
        maxW={[
            "container.sm",
            "container.sm",
            "container.md",
            "container.lg",
            "container.xl",
        ]}
        mx={["10px", "auto"]}
        my={24}
        py={4}
        px={6}
        border={"3px solid gray"}
        borderRadius={"lg"}
        bgColor={"gray.100"}
    >
        <Box>
            <RenderHtmlComponent htmlContent={postData} />
        </Box>
        <Divider mt={6} />
        <HStack mt={6} justifyContent={"flex-end"}>
            {/* <Button variant={"outline"} colorScheme="purple">
                Draft
            </Button> */}
            <Button
                variant={"solid"}
                colorScheme="purple"
                onClick={handleOnPostClick}
            >
                Post
            </Button>
        </HStack>
    </Box>
);

export default Post;
