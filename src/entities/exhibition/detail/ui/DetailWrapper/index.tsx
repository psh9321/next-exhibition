"use client"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { decode } from "he"

import { CopyX } from 'lucide-react';

import { Section, Wrapper, Div, Ul } from "./_html"

import { DetailHead } from "../DetailHead";
import { DetailContents } from "../DetailContents";
import { ExhibitionShare } from "@/features/ExhibitionShare/ui";

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { FadeInOutScaleAnimation } from "@/shared/lib/fadeInOutScaleAnimation";
import { BodyScrollLock } from "@/shared/lib/bodyScrollLock";
import { EmptyPage } from "@/shared/ui/EmptyPage";
import { RouteLoadingElement } from "@/shared/ui/Loading";

export const DetailWrapper = ({ seq } : {seq : string }) => {

    const navigation = useRouter();

    const queryClient = useQueryClient();

    const sectionRef = useRef<HTMLElement>(null);

    const { loadingStatus, SetLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus,
        SetLoadingStatus : state.SetLoadingStatus
    })));

    const queryData = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq]) as EXHIBITION_DETAIL_ITEM;

    function CloseCallback() { 
        if(!sectionRef["current"]) return 

        SetLoadingStatus("route");

        FadeInOutScaleAnimation<HTMLElement>(sectionRef["current"], "out", 200, () => {
            
            if(document.body.style.overflow === "hidden") BodyScrollLock(false);

            window.history.length > 1 ? navigation.back() : navigation.push("/");
        });
     }

    function WrapperCloseCallback(e : React.UIEvent) { 
        e.stopPropagation();

        if(e.target === e.currentTarget) CloseCallback();
    }

    useEffect(() => {

        if(!sectionRef["current"]) return 
        
        if(loadingStatus) SetLoadingStatus("");

        const section = sectionRef["current"];

        FadeInOutScaleAnimation<HTMLElement>(section, "in", 200);

        return () => {
            if(loadingStatus) SetLoadingStatus("");
        }

    },[]);

    return (
        <>
            <Wrapper onClick={WrapperCloseCallback}>
                <Section ref={sectionRef}>
                    {
                        queryData ? 
                        <Div>
                            <Ul>
                                <li>
                                    <ExhibitionShare item={queryData} />
                                </li>
                                <li>
                                    <button title={`"${decode(queryData["title"])}" 상세페이지 닫기 및 뒤로가기`} onClick={CloseCallback}>
                                        <CopyX/>
                                    </button>
                                </li>
                            </Ul>
                            <DetailHead item={queryData} />
                            <DetailContents item={queryData} />
                        </Div>                    
                        :
                        <EmptyPage closeCallback={CloseCallback}/>
                    }
                </Section>
            </Wrapper>

            <RouteLoadingElement/>
        </>
    )
}