import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { Box, Button, Divider, HStack, useToast } from "@chakra-ui/react";
import RenderHtmlComponent from "./RenderHtmlComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const toast = useToast();
    const [postData, setPostData] = useState(localStorage.getItem("post"));
    const [isPreview, setIsPreview] = useState(0);
    // const [usingMobile, setUsingMobile] = useState(false);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
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
                border={"3px solid #805ad5"}
                borderRadius={"lg"}
            >
                <TextEditor
                    postData={postData}
                    setPostData={setPostData}
                    isPreview={isPreview}
                    setIsPreview={setIsPreview}
                />
            </Box>
            {/* Here firstly I used && operator instead of ternary operator but it used to display the value of isPreview on the bottom left side of the editor */}
            {isPreview ? <PreviewPost postData={postData} /> : null}
        </Box>
    );
};

const PreviewPost = ({ postData }) => (
    <Box
        maxW={[
            "container.sm",
            "container.sm",
            "container.md",
            "container.lg",
            "container.xl",
        ]}
        mx={["10px", "auto"]}
        mt={24}
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
            <Button variant={"outline"} colorScheme="purple">
                Draft
            </Button>
            <Button variant={"solid"} colorScheme="purple">
                Post
            </Button>
        </HStack>
    </Box>
);

export default Post;
