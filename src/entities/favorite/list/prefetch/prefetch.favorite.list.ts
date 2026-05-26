import type { QueryClient } from "@tanstack/react-query"
import { API_SERVER_FAVORITE_LIST } from "../api/api.server.favorite.list";
import { useSession } from "next-auth/react";

export async function PrefetchExhibitionList(queryServer : QueryClient, queryStringObj : {[key : string] : string} ) {

    const { status } = useSession();

    if(status === "unauthenticated") return

    await queryServer.prefetchInfiniteQuery({
        queryKey : ["exhibition", "list" ,queryStringObj],
        queryFn : async ({pageParam}) => {

            const result = await API_SERVER_FAVORITE_LIST(pageParam) as API_SERVER_FAVORITE_LIST

            return result["data"] as FAVORITE_LIST;
        },
        initialPageParam : 0,
        getNextPageParam : (lastPage : FAVORITE_LIST) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    })
}