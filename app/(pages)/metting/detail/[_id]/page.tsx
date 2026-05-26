import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PrefetchMettingDetail } from "@/entities/metting/detail/prefetch/prefetch.metting.detail"

import MettingDetailPageView from "./_view"
import { notFound } from "next/navigation";
import { API_SERVER_METTING_DETAIL } from "@/entities/metting/detail/api/api.server.metting.detail";

interface METTING_DETAIL_PAGE_SERVER {
  params : Promise<{
      _id: string
  }>
}

const MettingDetailPageServer = async ({ params } : METTING_DETAIL_PAGE_SERVER) => {

    const { _id } = await params;

    const queryServer = new QueryClient();

    const mettingResult = await API_SERVER_METTING_DETAIL(_id);

    if(mettingResult.resultCode !== 200) return notFound();
    
    PrefetchMettingDetail(queryServer, mettingResult.data as METTING_DETAIL_INFO_ITEM);

    const dehydratedState = dehydrate(queryServer);
    
    return (
        <HydrationBoundary state={dehydratedState}>
            <MettingDetailPageView/>
        </HydrationBoundary>
    )
}

export default MettingDetailPageServer