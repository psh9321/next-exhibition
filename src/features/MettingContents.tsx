"use client"

import Quill from "react-quill-new"

import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook"

const quillModules = {
    toolbar: false,
}

export const MettingContents = () => {

    const { contents } = useMettingDetailHook();

    return (
        <Quill
            className="metting-contents-quill w-full"
            modules={quillModules}
            readOnly={true}
            theme="snow"
            value={contents ?? ""}
        />
    )
}
