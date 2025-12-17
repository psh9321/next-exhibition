import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { decode } from "he";

import { API_EXHIBITION_DETAIL } from "@/api/openApi.server";

import { EXHIBITION_API_DETAIL_RESPONSE } from "@/types/exhibition"

import { ExhibitionDetailModal } from "@/component/Paralles/ExhibitionDetailModal/Index";

import { ExhibitionDateFormat } from "@/util/dateFormat";

interface PARAMS { seq : string }

export async function generateMetadata({ params } : {
    params : { seq : string }
}) {
    const { seq } = params;

    const result = await API_EXHIBITION_DETAIL(seq) as EXHIBITION_API_DETAIL_RESPONSE;

    if(!result || !result["data"]) return {};

    const { title, place, startDate, endDate ,imgUrl } = result["data"];
    
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

export const ExhibitionDetailQueryServer = async (params : EXHIBITION_DETAIL_QUERY_SERVER) => {

    const { seq } = await params;

    const queryServer = new QueryClient();

    await queryServer.prefetchQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq],
        queryFn : async () => {

            const result = await API_EXHIBITION_DETAIL(seq) as EXHIBITION_API_DETAIL_RESPONSE;

            if(result["resultCode"] !== 200) return null

            return result["data"]
        },
    });

    const dehydratedState = dehydrate(queryServer);

    return (
        <>
            <HydrationBoundary state={dehydratedState}>
                <ExhibitionDetailModal seq={seq} />
            </HydrationBoundary>
        </>
        
    );
};