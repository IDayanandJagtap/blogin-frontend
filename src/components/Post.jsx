import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { Box, Button, Divider, HStack, useToast } from "@chakra-ui/react";
import RenderHtmlComponent from "./RenderHtmlComponent";

const Post = () => {
    const toast = useToast();
    const [postData, setPostData] = useState(localStorage.getItem("post"));
    const [isPreview, setIsPreview] = useState(0);
    const [usingMobile, setUsingMobile] = useState(false);

    useEffect(() => {
        const screenWidth = window.screen.width;
        if (screenWidth < 468) setUsingMobile(true);
        else setUsingMobile(false);

        if (!localStorage.getItem("post"))
            localStorage.setItem(
                "post",
                JSON.stringify("Start writing here !")
            );
    }, []);

    return (
        <>
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
                {usingMobile &&
                    setTimeout(() => {
                        toast({
                            title: "Use a big screen for better usability!",
                            status: "info",
                            position: "bottom",
                            isClosable: true,
                        });
                    }, 2000)}

                <TextEditor
                    postData={postData}
                    setPostData={setPostData}
                    isPreview={isPreview}
                    setIsPreview={setIsPreview}
                />
            </Box>

            {isPreview && <PreviewPost postData={postData} />}
        </>
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