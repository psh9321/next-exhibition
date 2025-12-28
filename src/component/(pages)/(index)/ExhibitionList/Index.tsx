'use client'

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Fragment, useEffect } from "react";

import { decode } from "he"

import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query"

import { useShallow } from "zustand/shallow"

import { SearchAlert } from 'lucide-react';

import { FetchLoadingElement, RouteLoadingElement } from "@/component/shared/Loading/Index";

import { useInterSectionObserver } from "@/hook/useInterSectionObserver"
import { useLoadingStore } from "@/store/useLoadingStore";

import { OPEN_API_CLIENT_RESPONSE_DATA, EXHIBITION_ITEM, EXHIBITION_API_RESPONSE, CLIENT_EXHIBITION_API_PARAMS  } from "@/types/exhibition"

import { ExhibitionDateFormat } from "@/util/dateFormat";
import { ImageError } from "@/util/imgError";
import { BodyScrollLock } from "@/util/bodyScrollLock";
import { SrcHttpToHttps } from "@/util/srcHttpToHttps";

import { API_EXHIBITION_LIST_CLIENT } from "@/api/openApi.client";

import { Section, Ul, Dl, Empty, Div } from "./_html";

export const ExhibitionList = () => {

    const searchParams = useSearchParams();

    const queryStringObj : {
        [key : string] : string
    } = {} ;

    if(searchParams.get("searchArea")) queryStringObj["searchArea"] = searchParams.get("searchArea") as string;
    if(searchParams.get("searchKeyword")) queryStringObj["searchKeyword"] = searchParams.get("searchKeyword") as string;
    if(searchParams.get("searchCategory")) queryStringObj["searchCategory"] = searchParams.get("searchCategory") as string;

    const { data, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"] as string, "list",queryStringObj],
        queryFn : Setup,
        initialPageParam: 1,
        getNextPageParam : (lastPage) => {

            if(!lastPage) return undefined;

            const { page, total, limit } = lastPage as OPEN_API_CLIENT_RESPONSE_DATA;

            if(total <= 0) return undefined;

            const totalPage = Math.ceil(total/limit);

            if(page < totalPage) return page+1;

            return undefined
        }
    });

    if(!data) return <></>

    const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
        threshold : 0
    });

    const { setLoadingStatus } = useLoadingStore(useShallow(state => ({
        setLoadingStatus : state.SetLoadingStatus
    })));

    const isEmpty = data.pages[0]?.total as number <= 0;

    async function Setup({ pageParam } : QueryFunctionContext){

        setLoadingStatus("fetch");
        BodyScrollLock(true);

        const queryStrArr = [...searchParams.entries()];
        
        const param : {
            offset : number,
            searchArea? : string,
            searchKeyword? : string
        } = {
            offset : Number(pageParam??1),
        }

        if(queryStrArr.length > 0) queryStrArr.forEach(([key, value]) => param[key as "searchArea" | "searchKeyword"] = value);
        
        return API_EXHIBITION_LIST_CLIENT(param as CLIENT_EXHIBITION_API_PARAMS)
        .then(rs => {

            setLoadingStatus("");
            BodyScrollLock(false);

            const result = rs as EXHIBITION_API_RESPONSE
                   
            return result["data"]
        })
        .catch(err => {
            setLoadingStatus("");
            BodyScrollLock(false);

            console.log("setup err", err)
        })
    }

    function GetQueryString() {
        return decodeURIComponent(new URLSearchParams(queryStringObj).toString())
    }

    useEffect(() => {
        if(isEmpty) return 
        if(isLoading) return

        if(isView) fetchNextPage();
        
    },[isView]);
    
    return (
        <Section>
            <h2 className="hidden">전시 목록</h2>
            {isEmpty && <Empty className="empty">
                <SearchAlert/>
                게시물이 없습니다.
            </Empty>}
            <Ul>
                {
                    
                    data?.pages.map((page) => {
                        
                        if(!page) return

                        const item = page["data"];

                        if(!item) return <></>

                        return item.map((el, i) => {
                            if(!el) return <Fragment key={`none-data-${i}`}></Fragment>

                            const { thumbnail, title, place, area, startDate, endDate,seq } = el as EXHIBITION_ITEM; 
                            
                            const exhibitionDate = (String(startDate) && String(endDate)) ? `${ExhibitionDateFormat(startDate)} ~ ${ExhibitionDateFormat(endDate)}` : "";
                            
                            return (
                                <li key={`${title}-${i}`}>
                                    <Link 
                                        scroll={false} 
                                        href={`/exhibition/${seq}?${GetQueryString()}`}
                                        onClick={() => {
                                            setLoadingStatus("route");
                                            BodyScrollLock(true);
                                        }}
                                    >
                                        <Div>
                                            <Image 
                                                fill
                                                sizes="100vw"
                                                src={SrcHttpToHttps(thumbnail)} 
                                                alt={`${decode(title)} 썸네일 이미지`} 
                                                unoptimized
                                                onError={ImageError}
                                                loading="eager"
                                            />
                                        </Div>
                                        <Dl>
                                            <dt className="title">{decode(title)}</dt>
                                            <dd className="place">{place}</dd>
                                            <dd className="date">{(String(startDate) && String(endDate)) && exhibitionDate}</dd>
                                            <dd className="category">
                                                <span>{area}</span>
                                            </dd>
                                        </Dl>
                                    </Link>
                                </li>
                            )
                            
                        })
                    })
                }

                <li ref={ref} style={{height : "1px"}}></li>
            </Ul>
            
            <RouteLoadingElement/>
            <FetchLoadingElement/>
            
        </Section>
    );
};