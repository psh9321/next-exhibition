'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import { decode } from "he"

import { CopyX, Share2 } from 'lucide-react';

import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { Wrapper, Section, Div, Article, ImgBox, Dl, BtnList, ExhibitionContents } from "./_html";

import { useLoadingStore } from "@/store/useLoadingStore";

import { EmptyPage } from "@/component/shared/EmptyPage/Index";

import { ExhibitionDateFormat } from "@/util/dateFormat";
import { ImageError } from "@/util/imgError";
import { FadeInOutScaleAnimation } from "@/util/fadeInOutScaleAnimation";
import { BodyScrollLock } from "@/util/bodyScrollLock";
import { SrcHttpToHttps } from "@/util/srcHttpToHttps";

import { EXHIBITION_DETAIL_ITEM } from "@/types/exhibition";

interface EXHIBITION_DETAIL_VIEW_MODAL {
    seq : string
}

export const ExhibitionDetailModal = ({ seq } : EXHIBITION_DETAIL_VIEW_MODAL) => {

    const navigation = useRouter();

    const queryClient = useQueryClient();

    const sectionRef = useRef<HTMLElement>(null);
    
    const { loadingStatus, setLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus,
        setLoadingStatus : state.SetLoadingStatus
    })));

    const queryData = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq]) as EXHIBITION_DETAIL_ITEM;

    function CloseCallback() { 
        if(!sectionRef["current"]) return 

        FadeInOutScaleAnimation<HTMLElement>(sectionRef["current"], "out", 200, () => {
            
            if(document.body.style.overflow === "hidden") BodyScrollLock(false);
            navigation.back();
        });
     }

    function WrapperCloseCallback(e : React.UIEvent) { 
        e.stopPropagation();

        if(e.target === e.currentTarget) CloseCallback();
    }

    function OnShareKaKaoCallback() {
        window.Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
                title : decode(queryData?.title),
                description: `장소 : ${queryData?.place} \n 날짜 : ${ExhibitionDateFormat(queryData?.startDate)}~${ExhibitionDateFormat(queryData?.endDate)} \n ${queryData?.contents1??""}`,
                imageUrl: queryData?.imgUrl,
                link: {
                    mobileWebUrl: `https://next-exhibition.vercel.app/exhibition/${seq}`,
                    webUrl: `https://next-exhibition.vercel.app/exhibition/${seq}`,
                }
            },
            link : {
                mobileWebUrl: `https://next-exhibition.vercel.app/exhibition/${seq}`,
                webUrl: `https://next-exhibition.vercel.app/exhibition/${seq}`,
            }
        });
    };

    useEffect(() => {

        if(!sectionRef["current"]) return 
        
        if(loadingStatus) setLoadingStatus("");

        const section = sectionRef["current"];

        FadeInOutScaleAnimation<HTMLElement>(section, "in", 200);

    },[]);
    
    return (
        <Wrapper onClick={WrapperCloseCallback}>
            <Section ref={sectionRef}>
                <h2 className="hidden">상세 페이지</h2>
                
                {
                    queryData ? 
                    <Div>
                        <BtnList>
                            <li>
                                <button title={`"${decode(queryData["title"])}" 카카오톡 공유`} onClick={OnShareKaKaoCallback}>
                                    <Share2/>
                                </button>
                            </li>
                            <li>
                                <button title={`"${decode(queryData["title"])}" 상세페이지 닫기 및 뒤로가기`} onClick={CloseCallback}>
                                    <CopyX/>
                                </button>
                            </li>
                        </BtnList>
                        <Dl className="head">
                            <dt>Exhibition Details</dt>
                            <dd className="title">{decode(queryData["title"])}</dd>
                            <dd className="date">
                                {
                                    (String(queryData["startDate"]) && String(queryData["endDate"])) ? `${ExhibitionDateFormat(queryData?.startDate)} ~ ${ExhibitionDateFormat(queryData?.endDate)}` : ""
                                }
                            </dd>
                            <dd className="place">{queryData["place"]}</dd>
                        </Dl>
                        <Article>
                            <h2 className="hidden"></h2>
                            <ImgBox>
                                <Image
                                    width={300}
                                    height={400}
                                    src={SrcHttpToHttps(queryData["imgUrl"]) || "/img404.png"}
                                    alt={`${decode(queryData["title"])} 썸네일 이미지`}
                                    unoptimized
                                    onError={ImageError}
                                />
                            </ImgBox>
                            <Dl className="info">
                                <dt>Exhibition Infomation</dt>
                                {
                                    (String(queryData["startDate"]) && String(queryData["endDate"])) && <dd className="date">{ExhibitionDateFormat(queryData["startDate"])} ~ {ExhibitionDateFormat(queryData["endDate"])}</dd>
                                }
                                { queryData["price"] !== "무료" && queryData["price"] !== "무료관람" && <dd className="price">{queryData["price"]}</dd> }
                                { queryData["phone"] && <dd className="callNumber">{queryData["phone"]}</dd> }
                                { queryData["placeAddr"] && <dd className="address">{queryData["placeAddr"]}</dd> }
                                <dd className="category">
                                    { queryData["price"] === "무료" || queryData["price"] === "무료관람" && <span>{queryData["price"]}</span> }
                                    { queryData["realmName"] && <span>{queryData["realmName"]}</span> }
                                    { queryData["area"] && <span>{queryData["area"]}</span> }
                                    { queryData["sigungu"] && <span>{queryData["sigungu"]}</span> }
                                </dd>
                            </Dl>
                        </Article>
                    </Div>                    
                    :
                    <EmptyPage closeCallback={CloseCallback}/>
                }

                {/* { contents1 && <ExhibitionContents value={contents1} />  } */}
            </Section>
        </Wrapper>
    );
};