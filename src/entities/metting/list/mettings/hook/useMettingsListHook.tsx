"use client"

import { useParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query"

import { API_CLIENT_METTING_METTINGS } from "../api/api.client.mettings.list";

export const useMettingsListHook = () => {

    const { seq } = useParams<{seq : string}>();

    const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey : ["metting","list","mettings",seq],
        queryFn : async ({pageParam}) => API_CLIENT_METTING_METTINGS(seq, pageParam, 20),
        initialPageParam : 0,
        getNextPageParam: (lastPage) => {
            if(!lastPage || lastPage instanceof Error) return undefined;

            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        }
    })

    const mettingsTotal = data?.pages.at(-1)?.total??0;

    return { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, mettingsTotal } 

}