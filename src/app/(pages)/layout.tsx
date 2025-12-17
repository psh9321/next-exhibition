"use client"

import { ReactNode } from "react";

import { LAYOUT_CHILD } from "@/types/component"

interface ROOT_LAYOUT extends LAYOUT_CHILD {
    parallel : ReactNode,
}

const IndexPageRoot = ({ children, parallel } : ROOT_LAYOUT) => {

    return (
        <>
            {children}
            {parallel}
        </>
        
    );
};

export default IndexPageRoot;