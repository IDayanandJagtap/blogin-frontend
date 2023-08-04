import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { Box, useToast } from "@chakra-ui/react";

const Post = () => {
    const toast = useToast();
    const [textData, setTextData] = useState("");

    const [usingMobile, setUsingMobile] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 20);
        const screenWidth = window.screen.width;
        if (screenWidth < 468) setUsingMobile(true);
        else setUsingMobile(false);
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

                <TextEditor setTextData={setTextData} />
            </Box>

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
                Click preview to view the post!.
            </Box>
        </>
    );
};

export default Post;
