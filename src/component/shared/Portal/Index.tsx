"use client"

import ReactDOM from "react-dom";

import { useEffect, useState } from "react";

import { LAYOUT_CHILD } from "@/types/component"

export const Portal = ({ children } : LAYOUT_CHILD) => {

    const [ isMount, SetIsMound ] = useState<boolean>(false);

    if(!document.getElementById("portal-root")) return <>{children}</>

    useEffect(() => {
        SetIsMound(true);
    },[]);

    if(!isMount) return <>{children}</>

    const elements = document.getElementById("portal-root");

    return ReactDOM.createPortal( children, elements! );
}