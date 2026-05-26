"use client"

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query"

export const useExhibitionDetailHook = () : EXHIBITION_DETAIL_ITEM => {

    const { seq } = useParams<{seq : string}>()

    const queryKey = ["exhibition", "detail" ,seq];

    const { data } = useQuery({
        queryKey,
        queryFn : () => {
            return {} as EXHIBITION_DETAIL_ITEM
        },
        initialData : () => {
            return {} as EXHIBITION_DETAIL_ITEM
        },
        enabled : false
    })

    return data as EXHIBITION_DETAIL_ITEM
}