"use client"

import dynamic from "next/dynamic";

import type { QuillOptionsStatic } from "react-quill-new"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QUILL_EDITOR {
    className? : string,
    value? : string,
}

const toolbar = {
    container : [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
    
    ],
}

export const Quill = ({ className, value } : QUILL_EDITOR) => {

    const modules : QuillOptionsStatic["modules"] = {
        toolbar : false,
    };

    return (
        <>
            <ReactQuill readOnly defaultValue={value??""} className={className??""} modules={modules} theme='snow'
            />
        </>
    )
}