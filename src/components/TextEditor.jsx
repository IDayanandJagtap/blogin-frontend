import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, HStack } from "@chakra-ui/react";

export default function TextEditor({
    isPreview,
    setIsPreview,
    setPostData,
    postData,
}) {
    //**************  Set your api key in env ***************************
    const API_KEY = process.env.REACT_APP_EDITOR_KEY;

    const editorRef = useRef(null);

    const handleEditorDataOnChange = () => {
        setPostData(editorRef.current.getContent());
    };

    const handleSaveLocal = () => {
        localStorage.setItem("post", postData);
    };

    return (
        <>
            <Editor
                id="post-editor"
                apiKey={API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={postData}
                onBlur={handleSaveLocal}
                onChange={handleEditorDataOnChange}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "save",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
            <HStack mt={2} p={4} w={"100%"} justifyContent={"flex-end"}>
                <Button
                    colorScheme="purple"
                    size={"md"}
                    onClick={() => {
                        setPostData(editorRef.current.getContent());
                        setIsPreview(!isPreview);
                    }}
                >
                    {isPreview ? "Hide Preview" : "Preview"}
                </Button>
            </HStack>
        </>
    );
}
