import type { QueryClient } from "@tanstack/react-query"
import { API_SERVER_GET_EXHIBITION_DETAIL } from "../api/api.server.exhibition.detail";

export async function PrefetchExhibitionDetail(queryServer : QueryClient, seq : string ) {

    return await queryServer.prefetchQuery({
        queryKey : ["exhibition", "detail" ,seq],
        queryFn : () => API_SERVER_GET_EXHIBITION_DETAIL(seq),
    })
}