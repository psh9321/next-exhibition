import { CSSProperties, useEffect, useRef } from "react";

import { useShallow } from "zustand/shallow";

import { ScanSearch, Route, Scroll } from 'lucide-react';

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { Wrapper, Inner, P, Span } from "./_html";

interface LOADING_ICON extends LAYOUT_CHILD {
    style? : CSSProperties
}

export const LoadingIcon = ({ children, style } : LOADING_ICON) => {

    const parentRef = useRef<HTMLDivElement>(null);

    const animationRef = useRef<HTMLSpanElement>(null);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if(!parentRef["current"]) return
        if(!animationRef["current"]) return 

        const element = animationRef["current"];

        intervalRef["current"] = setInterval(() => {
            if(element.textContent && element.textContent.length >= 3) element.innerHTML=""
            element.append(".")
        }, 250);

        const parentElement = parentRef["current"];

        parentElement.style.bottom = visualViewport ? `${window.innerHeight - visualViewport["height"] + 50}px` : "50px";
         
        return () => {
            if(intervalRef["current"]) clearInterval(intervalRef["current"]);
        }
    },[]);

    return (
        <Wrapper>
            <Inner ref={parentRef} style={style}>
                <P>{children}</P>
                <Span ref={animationRef}>.</Span>
            </Inner>
        </Wrapper>

    );
};

export const FetchLoadingIcon = () => {

    return (
        <LoadingIcon style={{ width : "300px" }}>
            <Scroll/>전시정보 불러오는 중
        </LoadingIcon>
    )
}

export const SearchLoadingIcon = () => {

    return (
        <LoadingIcon>
            <ScanSearch/>검색중
        </LoadingIcon>
    )
}

export const RouteLoadingIcon = () => {

    return (
        <LoadingIcon>
            <Route/>로딩중
        </LoadingIcon>
    )   
}