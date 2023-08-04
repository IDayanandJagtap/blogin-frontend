import React from "react";
import TextEditor from "./TextEditor";
import { Box } from "@chakra-ui/react";

const Post = () => {
    return (
        <Box
            maxW={"container.xl"}
            mx={"auto"}
            mt={32}
            border={"2px solid gray"}
            borderRadius={"lg"}
        >
            <TextEditor />
        </Box>
    );
};

export default Post;
