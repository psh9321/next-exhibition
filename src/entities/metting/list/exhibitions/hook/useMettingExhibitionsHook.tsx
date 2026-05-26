"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { API_CLIENT_METTING_EXHIBITION } from "../api/api.client.metting.exhibition"

export const useMettingExhibitionsHook = () => {

    const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey : ["metting","exhibitions","list"],
        queryFn : async ({pageParam}) => {
            return await API_CLIENT_METTING_EXHIBITION(pageParam, 20);
        },
        initialPageParam : 0,
        getNextPageParam: (lastPage) => {
            if(!lastPage || lastPage instanceof Error) return undefined;

            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        }
    })

    const mettingExhibitionsTotal = data?.pages.at(-1)?.total??0;

    return { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, mettingExhibitionsTotal } 
}