'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import { decode } from "he"

import { CopyX, Share2 } from 'lucide-react';

import { useQueryClient } from "@tanstack/react-query";

import { Wrapper, Section, Div, Article, ImgBox, Dl, BtnList, ExhibitionContents } from "./_html";

import { useLoadingStore } from "@/store/useLoadingStore";

import { ExhibitionDateFormat } from "@/util/dateFormat";
import { ImageError } from "@/util/imgError";
import { FadeInOutScaleAnimation } from "@/util/fadeInOutScaleAnimation";
import { BodyScrollLock } from "@/util/bodyScrollLock";

import { EXHIBITION_DETAIL_ITEM } from "@/types/exhibition";
import { useShallow } from "zustand/shallow";

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

    if (!queryData) return <></>

    const { title, startDate, endDate, place, imgUrl, phone, placeAddr, sigungu, area, realmName, price, contents1 } = queryData;

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
                title : decode(title),
                description: `장소 : ${place} | 날짜 : ${ExhibitionDateFormat(startDate)}~${ExhibitionDateFormat(endDate)} ${contents1??""}`,
                imageUrl: imgUrl,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        });
    };
    
    const exhibitionDate = (String(startDate) && String(endDate)) ? `${ExhibitionDateFormat(startDate)} ~ ${ExhibitionDateFormat(endDate)}` : "";
    
    useEffect(() => {

        if(!sectionRef["current"]) return 
        
        if(loadingStatus) setLoadingStatus("");

        const section = sectionRef["current"];

        FadeInOutScaleAnimation<HTMLElement>(section, "in", 200);

    },[])
    return (
        <Wrapper onClick={WrapperCloseCallback}>
            <Section ref={sectionRef}>
                <h2 className="hidden">상세 페이지</h2>
                
                <Div>
                    <BtnList>
                        <li>
                            <button title={`"${decode(title)}" 카카오톡 공유`} onClick={OnShareKaKaoCallback}>
                                <Share2/>
                            </button>
                        </li>
                        <li>
                            <button title={`"${decode(title)}" 상세페이지 닫기 및 뒤로가기`} onClick={CloseCallback}>
                                <CopyX/>
                            </button>
                        </li>
                    </BtnList>
                    <Dl className="head">
                        <dt>Exhibition Details</dt>
                        <dd className="title">{decode(title)}</dd>
                        <dd className="date">{(String(startDate) && String(endDate)) && exhibitionDate}</dd>
                        <dd className="place">{place}</dd>
                    </Dl>
                    <Article>
                        <h2 className="hidden"></h2>
                        <ImgBox>
                            <Image
                                width={300}
                                height={400}
                                src={imgUrl || "/img404.png"}
                                alt={`${decode(title)}, 장소 : ${place}, 날짜 : ${exhibitionDate}`}
                                unoptimized
                                onError={ImageError}
                            />
                        </ImgBox>
                        <Dl className="info">
                            <dt>Exhibition Infomation</dt>
                            {
                                (String(startDate) && String(endDate)) && <dd className="date">{ExhibitionDateFormat(startDate)} ~ {ExhibitionDateFormat(endDate)}</dd>
                            }
                            { price !== "무료" && price !== "무료관람" && <dd className="price">{price}</dd> }
                            { phone && <dd className="callNumber">{phone}</dd> }
                            { placeAddr && <dd className="address">{placeAddr}</dd> }
                            <dd className="category">
                                { price === "무료" || price === "무료관람" && <span>{price}</span> }
                                { realmName && <span>{realmName}</span> }
                                { area && <span>{area}</span> }
                                { sigungu && <span>{sigungu}</span> }
                            </dd>
                        </Dl>
                    </Article>
                </Div>
                {/* { contents1 && <ExhibitionContents value={contents1} />  } */}
            </Section>
        </Wrapper>
        
    );
};