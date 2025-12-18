'use client'

import { useEffect, useRef } from "react";
import { setInterval } from "timers";

import { ScanSearch, Route } from 'lucide-react';
import { useShallow } from "zustand/shallow";

import { Portal } from "@/component/shared/Portal/Index";

import { useLoadingStore } from "@/store/useLoadingStore";

import { Wrapper, Inner, SearchContents, Span } from "./_html";

import { LAYOUT_CHILD } from "@/types/component"

interface LOADING_ICON extends LAYOUT_CHILD {
    className? : string
}

export const LoadingIcon = ({ children, className } : LOADING_ICON) => {

    const parentRef = useRef<HTMLParagraphElement>(null);

    const animationRef = useRef<HTMLSpanElement>(null);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {

        if(!parentRef["current"]) return
        if(!animationRef["current"]) return 

        const element = animationRef["current"];

        document.body.style.overflow = "hidden";

        parentRef["current"].classList.add("on");

        const timer = setTimeout(() => {
            intervalRef["current"] = setInterval(() => {
                if(element.textContent && element.textContent.length >= 3) element.textContent=""
                element.textContent+="."
            }, 250);

            clearTimeout(timer);
        }, 250);

        return () => {
            document.body.style.overflow = "";
            if(intervalRef["current"]) clearInterval(intervalRef["current"]);
        }
    },[]);

    return (
        <Wrapper className={className??""}>
            <Inner ref={parentRef}>
                {children}
                <Span className={className??""} ref={animationRef}>.</Span>
            </Inner>
        </Wrapper>
    );
};

export const FetchLoadingElement = () => {

    const { loadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus
    })));

    if(loadingStatus !== "fetch") return <></>;

    return (
        <Portal>
            <LoadingIcon/>
        </Portal>
    )
}

export const SearchLoadingElement = () => {

    const { loadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus
    })));

    if(loadingStatus !== "search") return <></>;

    return (
        <Portal>
            <LoadingIcon className={"search"}>
                <SearchContents>
                    <ScanSearch/>검색중
                </SearchContents>
            </LoadingIcon>
        </Portal>
    )
}

export const RouteLoadingElement = () => {

    const { loadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus
    })));

    if(loadingStatus !== "route") return <></>;

    return (
        <Portal>
            <LoadingIcon className={"search"}>
                <SearchContents>
                    <Route/>로딩중
                </SearchContents>
            </LoadingIcon>
        </Portal>
    )   
}