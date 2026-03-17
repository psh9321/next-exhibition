"use client"

import ReactDOM from "react-dom";

import { useEffect, useState } from "react";

export const Portal = ({ children } : LAYOUT_CHILD) => {

    const elements = document.getElementById("portal-root");

    if(!elements) return alert("portal-root undefined");
    if(elements.hasChildNodes()) return

    return ReactDOM.createPortal( children, elements! );
}