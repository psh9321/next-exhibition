"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { API_CLIENT_REVIEW_LIST } from "../api/api.client.review.list";


export const useReviewListHook = (seq : string, isMy : boolean) => {

    const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }  = useInfiniteQuery({
        queryKey : ["review", seq, `my=${isMy}`],
        queryFn : async ({pageParam}) => API_CLIENT_REVIEW_LIST(seq, isMy, pageParam),
        initialPageParam : 0,
        getNextPageParam : (lastPage) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    });

    const reviewTotal = data?.pages.at(-1)?.total??0;

    return { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, reviewTotal } 
}