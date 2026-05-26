"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { API_CLIENT_METTING_PROMISE } from "../api/api.client.metting.promise";
import { useSessionHook } from "@/shared/hook/useSessionHook";

export const useMettingPromiseListHook = () => {

    const { isLogin } = useSessionHook();

    const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }  = useInfiniteQuery({
        queryKey : ["metting", "list", "promise"],
        queryFn : async ({pageParam}) => {
    
            const result = await API_CLIENT_METTING_PROMISE(pageParam);
            return result;
        },
        initialPageParam : 0,
        enabled : isLogin,
        getNextPageParam : (lastPage) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        }
    });

    const promiseTotal = data?.pages.at(-1)?.total??0;

    return { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, promiseTotal } 
}