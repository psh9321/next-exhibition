"use client"
import { Fragment, useEffect } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"
import { useShallow } from "zustand/shallow";

import { Article, Ul } from "./_html"

import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";
import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { API_EXHIBITION_LIST_CLIENT } from "@/entities/exhibition/list/api/exhibition.list.client";
import { BodyScrollLock } from "@/shared/lib/bodyScrollLock";

import { EmptyItem } from "@/entities/exhibition/list/ui/EmptyItem";
import { ExhibitionItem } from "@/entities/exhibition/list/ui/ExhibitionItem";
import { FetchLoadingElement, RouteLoadingElement } from "@/shared/ui/Loading";

export const ExhibitionList = () => {

    const searchParams = useSearchParams();

    const queryStringObj : { [key : string] : string } = {};

    if(searchParams.get("searchArea")) queryStringObj["searchArea"] = searchParams.get("searchArea") as string;
    if(searchParams.get("searchKeyword")) queryStringObj["searchKeyword"] = searchParams.get("searchKeyword") as string;
    if(searchParams.get("searchCategory")) queryStringObj["searchCategory"] = searchParams.get("searchCategory") as string;
    
    const { data, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"] as string, "list",queryStringObj],
        queryFn : Setup,
        initialPageParam: 1,
        getNextPageParam : (lastPage) => {

            if(!lastPage) return undefined;

            const { page, total, limit } = lastPage;

            if(total <= 0) return undefined;

            const totalPage = Math.ceil(total/limit);

            if(page < totalPage) return page+1;

            return undefined
        }
    });

    const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
        threshold : 0
    });

    const { SetLoadingStatus } = useLoadingStore(useShallow(state => ({
        SetLoadingStatus : state.SetLoadingStatus
    })));

    async function Setup({ pageParam } : QueryFunctionContext){

        SetLoadingStatus("fetch");
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
        
        const result = await API_EXHIBITION_LIST_CLIENT(param as CLIENT_EXHIBITION_API_PARAMS);

        SetLoadingStatus("");
        BodyScrollLock(false);

        return result??undefined
    }

    const isEmpty = data?.pages[0]?.total as number <= 0;

    useEffect(() => {
        if(isEmpty) return 
        if(isLoading) return

        if(isView) fetchNextPage();
        
    },[isView]);

    return (
        <Article>
            { isEmpty && <EmptyItem/> }
            <Ul>
                {
                    
                    data?.pages.map((page) => {
                        
                        if(!page) return

                        const item = page["data"];

                        if(!item) return <Fragment key={`전시목록-데이터없음`}></Fragment>

                        return item.map((el, i) => {
                            if(!el) return <Fragment key={`exhibition-none-data-${i}`}></Fragment>
                            
                            return (
                                <ExhibitionItem  key={`${el?.["title"]}-${i}`} item={el} />
                            )
                            
                        })
                    })
                }

                <li ref={ref} style={{height : "1px"}}></li>
            </Ul>        

            <FetchLoadingElement/>
            <RouteLoadingElement/>
        </Article>
    )
}