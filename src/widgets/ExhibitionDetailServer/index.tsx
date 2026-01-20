import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { decode } from "he";

import { API_EXHIBITION_DETAIL_SERVER } from "@/entities/exhibition/detail/api/exhibition.detail.server";

import { DetailWrapper } from "@/entities/exhibition/detail/ui/DetailWrapper";
import { ExhibitionDateFormat } from "@/shared/lib/dateFormat";

interface PARAMS { seq : string }

export async function generateMetadata({ params } : {
    params : { seq : string }
}) {
    const { seq } = params;

    const result = await API_EXHIBITION_DETAIL_SERVER(seq) as EXHIBITION_DETAIL_ITEM;

    if(!result) return {};

    const { title, place, startDate, endDate ,imgUrl } = result;
    
    return {
      title: decode(title),
      description: `${place} | ${ExhibitionDateFormat(startDate)}~${ExhibitionDateFormat(endDate)}`,
      openGraph: {
        type: "article",
        images: [{ url: imgUrl }],
      },
    };
}

type EXHIBITION_DETAIL_QUERY_SERVER = Promise<PARAMS>; 

export const ExhibitionDetailServer = async (params : EXHIBITION_DETAIL_QUERY_SERVER) => {

    const { seq } = await params;

    const queryServer = new QueryClient();

    await queryServer.prefetchQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq],
        queryFn : async () => {

            const result = await API_EXHIBITION_DETAIL_SERVER(seq) as EXHIBITION_DETAIL_ITEM;

            return result
        },
    });

    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <DetailWrapper seq={seq} />
        </HydrationBoundary>
    );
};