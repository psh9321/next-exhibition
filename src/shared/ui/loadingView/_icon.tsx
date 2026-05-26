"use client"

import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge"

import { Scroll, ScanSearch, SearchX } from 'lucide-react';


interface LOADING_ICON extends LAYOUT_CHILD {
    className? : string
}

const LoadingIcon = ({ children, className } : LOADING_ICON) => {

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
        <div className="fixed top-0 left-0 block w-full h-full z-9999999 select-none">
            <div ref={parentRef} className={twMerge("absolute bottom-[-100%] left-1/2 -translate-x-1/2 inline-block w-[150px] h-[90px] text-center text-basic-color bg-[#11151E] rounded-[20px] transition-[0.25s] shadow-[3px_3px_3px_3px_rgba(0,0,0,0.8)] border border-border-color", className??"")}>
                <p className="absolute top-[15px] flex justify-center items-center gap-[10px] w-full text-[22px] font-bold [&>svg]:size-[30px] [&>svg]:stroke-basic-color">
                    {children}                    
                </p>
                <span ref={animationRef} className="relative inline-block text-[65px] rounded-[10px]">.</span>
            </div>
        </div>
    )
}

/** 전시정보 불러오기 아이콘 */
export const ExhibitionListFetchIcon = () => {
    return (
        <LoadingIcon className="w-[300px]">
            <Scroll/> 전시정보 불러오는 중
        </LoadingIcon>
    )
}

/** 전시정보 검색 아이콘 */
export const ExhibitionListSearchIcon = () => {

    return (
        <LoadingIcon>
            <ScanSearch/>검색중
        </LoadingIcon>
    )
}

/** 전시정보 검색 아이콘 */
export const ExhibitionListSearchResetIcon = () => {

    return (
        <LoadingIcon>
            <SearchX/>검색 초기화
        </LoadingIcon>
    )
}

