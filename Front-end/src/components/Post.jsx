import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { Box, useToast } from "@chakra-ui/react";
import RenderHtmlComponent from "./RenderHtmlComponent";

const Post = () => {
    const toast = useToast();
    const [postData, setPostData] = useState(localStorage.getItem("post"));
    const [isPreview, setIsPreview] = useState(0);
    const [usingMobile, setUsingMobile] = useState(false);

    // chakra ui resets the default html styling so let's get it back.
    const changeToChakraTags = () => {
        let textString = localStorage.getItem("post");
        console.log(typeof textString);
        textString = textString.replace("<h1", "<Heading as='h1'");
        textString = textString.replace("<h2", "<Heading as='h2'");
        textString = textString.replace("<h3", "<Heading as='h3'");
        textString = textString.replace("<h4", "<Heading as='h4'");
        textString = textString.replace("<h5", "<Heading as='h5'");
        textString = textString.replace("<h6", "<Heading as='h6'");
        textString = textString.replace("</h1>", "</Heading>");
        textString = textString.replace("</h2>", "</Heading>");
        textString = textString.replace("</h3>", "</Heading>");
        textString = textString.replace("</h4>", "</Heading>");
        textString = textString.replace("</h5>", "</Heading>");
        textString = textString.replace("</h6>", "</Heading>");
        textString = textString.replace("<p>", "<Text>");
        textString = textString.replace("</p>", "</Text>");

        localStorage.setItem("post", textString);
        setPostData(textString);
    };

    useEffect(() => {
        const screenWidth = window.screen.width;
        if (screenWidth < 468) setUsingMobile(true);
        else setUsingMobile(false);

        if (!localStorage.getItem("post"))
            localStorage.setItem(
                "post",
                JSON.stringify("Start writing here !")
            );

        changeToChakraTags();
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
                border={"2px solid gray"}
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
        p={4}
        border={"2px solid gray"}
        borderRadius={"lg"}
    >
        <RenderHtmlComponent htmlContent={postData} />
    </Box>
);

export default Post;
