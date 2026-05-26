import type { QueryClient } from "@tanstack/react-query"

export function PrefetchMettingDetail(queryServer : QueryClient, data : METTING_DETAIL_INFO_ITEM) {
    queryServer.setQueryData(["metting", "detail", data._id], data)
}