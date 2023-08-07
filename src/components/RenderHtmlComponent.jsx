import React from "react";
import { Box } from "@chakra-ui/react";
const RenderHtmlComponent = ({ htmlContent }) => {
    return <Box dangerouslySetInnerHTML={{ __html: htmlContent }}></Box>;
};

export default RenderHtmlComponent;
