"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { API_CLIENT_FAVORITE_LIST } from "../api/api.client.favorite.list";
import { useSessionHook } from "@/shared/hook/useSessionHook";

export const useFavoriteListHook = () => {

    const { isLogin } = useSessionHook()

    const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }  = useInfiniteQuery({
        queryKey : ["favorite", "list"],
        queryFn : async ({pageParam}) => {

            return await API_CLIENT_FAVORITE_LIST(pageParam);
        },
        initialPageParam : 0,
        enabled : isLogin,
        getNextPageParam : (lastPage) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    });

    const favoriteTotal = data?.pages.at(-1)?.total??0;

    return { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, favoriteTotal } 
}