import React from "react";
import "../styles/defaultStyles.css";

const RenderHtmlComponent = ({ htmlContent }) => {
    return (
        <div
            className="previewDiv"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
    );
};

export default RenderHtmlComponent;
