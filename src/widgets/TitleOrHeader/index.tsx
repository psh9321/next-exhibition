'use client'

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import useMediaQuery from "@parksuhyun9321/use-media-query";

import { Div, Dl, Aside } from "./html";
import { Headers } from "@/shared/ui/Headers";
import { ExhibitionSearch } from "@/features/ExhibitionSearch/ui";

import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";




const Contents = () => {

    return (
        <>
            <Dl>
                <dt>Discover Exhibitions</dt>
                <dd>전시, 하나의 경험이 되다.</dd>
            </Dl>    
            <ExhibitionSearch/>
        </>
    )
}

const ANIMATION_CLASS : string = "active";

export const TitleOrHeader = () => {

    const sideRef = useRef<HTMLElement>(null);

    const [ isTitle, SetIsTitle ] = useState<boolean>(true);

    const [ isSide, SetIsSide ] = useState<boolean>(false);

    const [isHeaders, SetIsHeaders ] = useState<boolean>(false);

    const pathname = usePathname();

    const { ref, isView } = useInterSectionObserver<HTMLDivElement>({
        threshold : 0
    });

    const { isResize } = useMediaQuery(1760);

    useEffect(() => {
        
        if(isView) {
            SetIsTitle(true);
            
            if(isHeaders) SetIsHeaders(false);
            if(!sideRef["current"]) return

            const sideElement = sideRef["current"];
            if(sideElement.classList.contains(ANIMATION_CLASS))
            sideElement.classList.remove(ANIMATION_CLASS);

            const timer = setTimeout(() => {
                SetIsSide(false)
                clearTimeout(timer);        
            }, 250);
        }
        else {

            if(isResize) {
                if(!isHeaders) SetIsHeaders(true);
                if(isSide) SetIsSide(false);
            }
            else {
                if(isHeaders) SetIsHeaders(false);
                if(!isSide) SetIsSide(true);
            }
            
            SetIsTitle(false);
            
        }
    },[isView, isResize]);

    useEffect(() => {

        if(!sideRef["current"]) return

        const sideElement = sideRef["current"];

        if(!isSide && sideElement.classList.contains(ANIMATION_CLASS)) return

        sideElement.classList.add(ANIMATION_CLASS);
    },[isSide, pathname])
    
    return (
        <>
            { isHeaders && <Headers/> }

            <Div> { isTitle && <Contents/> } </Div>
            
            <div ref={ref} style={{height : "1px"}}></div>

            { isSide && <Aside ref={sideRef}><Contents/></Aside> }
        </>
    );
};