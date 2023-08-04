import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor() {
    //**************  Move this api key to env ***************************
    const API_KEY = "jgz5jj3s34rhiz3u7ivietk9q3epaj2k1sczpuwzgad2vub7";

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                apiKey={API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Start writing from here.</p>"
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
            <button onClick={log}>Log editor content</button>
        </>
    );
}
