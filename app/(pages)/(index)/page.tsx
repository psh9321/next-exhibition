import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PrefetchExhibitionList } from "@/entities/exhibition/list/prefetch/prefetch.exhibition.list";

import IndexPageView from "./_view"

interface INDEX_PAGE_SERVER {
  searchParams : Promise<{
      keyword?: string
      area?: string
      type?: string
  }>
}

const IndexPageServer = async ({ searchParams } : INDEX_PAGE_SERVER) => {

    const { keyword, area, type } = await searchParams;
    
    const queryServer = new QueryClient();

    const queryKeyObj : {
        [key : string] : string
    } = {};

    if(keyword) queryKeyObj["keyword"] = keyword;
    if(area) queryKeyObj["area"] = area;
    if(type) queryKeyObj["type"] = type

    await PrefetchExhibitionList(queryServer, queryKeyObj)
    
    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
          <IndexPageView/>
        </HydrationBoundary>
        
    )
}

export default IndexPageServer