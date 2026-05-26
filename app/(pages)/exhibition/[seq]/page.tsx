import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PrefetchExhibitionDetail } from "@/entities/exhibition/detail/prefetch/prefetch.exhibition.detail";

import ExhibitionDetailPageView from "./_view"

interface EXHIBITION_DETAIL_PAGE_SERVER {
  params : Promise<{
      seq: string
  }>
}

const ExhibitionDetailPageServer = async ({ params } : EXHIBITION_DETAIL_PAGE_SERVER) => {

    const { seq } = await params;

    const queryServer = new QueryClient();

    await PrefetchExhibitionDetail(queryServer ,seq);

    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <ExhibitionDetailPageView />
        </HydrationBoundary>
    )
}

export default ExhibitionDetailPageServer