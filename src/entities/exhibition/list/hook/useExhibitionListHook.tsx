"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { API_CLIENT_EXHIBITION_LIST } from "../api/api.client.exhibition.list";

export const useExhibitionListHook = (type? : SERVICE_TYPE, keyword? : string, area? : DISTRICT) => {

    const queryKeyObj : {
        [key : string] : string
    } = {};

    if(keyword) queryKeyObj["keyword"] = keyword;
    if(area) queryKeyObj["area"] = area;
    if(type) queryKeyObj["type"] = type;

    const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }  = useInfiniteQuery({
        queryKey : ["exhibition", "list", queryKeyObj],
        queryFn : async ({pageParam}) => {

            const params = {
                offset : pageParam??1, 
                limit : 20,
                type : type??"A"
            } as EXHIBITION_LIST_PARAMS

            if(area) params["area"] = area;
            if(keyword) params["keyword"] = keyword;

            return await API_CLIENT_EXHIBITION_LIST(params);
        },
        initialPageParam : 1,
        getNextPageParam : (lastPage) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    })

    return { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } 
}
