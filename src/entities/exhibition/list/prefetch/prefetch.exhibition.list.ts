import type { QueryClient } from "@tanstack/react-query"
import { API_SERVER_GET_EXHIBITION_LIST } from "../api/api.server.exhibition.list";

export async function PrefetchExhibitionList(queryServer : QueryClient, queryStringObj : {[key : string] : string} ) {

    await queryServer.prefetchInfiniteQuery({
        queryKey : ["exhibition", "list" ,queryStringObj],
        queryFn : async ({pageParam}) => {

            const params = {
                offset : pageParam??1, 
                limit : 20,
                type : queryStringObj["type"]??"A",
                ...queryStringObj
            } as EXHIBITION_LIST_PARAMS

            return await API_SERVER_GET_EXHIBITION_LIST(params) as INFINITY_RESPONSE_ITEM<EXHIBITION_ITEM[]>;
        },
        initialPageParam : 1,
        getNextPageParam : (lastPage : INFINITY_RESPONSE_ITEM<EXHIBITION_ITEM[]>) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    })
}