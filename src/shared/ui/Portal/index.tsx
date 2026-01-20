"use client"

import ReactDOM from "react-dom";

import { useEffect, useState } from "react";

export const Portal = ({ children } : LAYOUT_CHILD) => {

    const [ isMount, SetIsMound ] = useState<boolean>(false);

    useEffect(() => {
        SetIsMound(true);
    },[]);


    if(!isMount) return <>{children}</>

    if(!document.getElementById("portal-root")) return <>{children}</>

    const elements = document.getElementById("portal-root");

    return ReactDOM.createPortal( children, elements! );
}