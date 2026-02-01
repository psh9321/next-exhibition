import type { Metadata } from "next";

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { decode } from "he";

import { API_EXHIBITION_DETAIL_SERVER } from "@/entities/exhibition/detail/api/exhibition.detail.server";

import { DetailWrapper } from "@/entities/exhibition/detail/ui/DetailWrapper";
import { ExhibitionDateFormat } from "@/shared/lib/dateFormat";

export async function generateMetadata({ params }: { params: SEARCH_PARAMS }) {
    const { seq } = params;

    const result = (await API_EXHIBITION_DETAIL_SERVER(
        seq,
    )) as EXHIBITION_DETAIL_ITEM;

    if (!result) return {};

    const { title, place, startDate, endDate, imgUrl } = result;

    return {
        metadataBase: new URL(`https://next-exhibition.vercel.app/exhibition/${seq}`),
        title: decode(title),
        description: `${place} | ${ExhibitionDateFormat(startDate)}~${ExhibitionDateFormat(endDate)}`,
        keywords : [decode(title)],
        category : decode(title),
        appLinks : {
            web : {
            url : `https://next-exhibition.vercel.app/exhibition/${seq}`,
            should_fallback : true,
            }
        },
        robots : {
            index : true,
            follow : true,
            nocache : true,
            noimageindex : true,
            "max-video-preview" : -1,
            "max-snippet" :  -1,
            "max-image-preview" : "standard",
            googleBot : {
            index : true,
            follow : true,
            nocache : true,
            noimageindex : true,
            "max-video-preview" : -1,
            "max-snippet" :  -1,
            "max-image-preview" : "standard",
            }
        },
        openGraph: {
            type: "article",
            images: [{ url: imgUrl }],
        },
    } as Metadata;
}

export const ExhibitionDetailServer = async (
    params: SEARCH_PARAMS_PROMISE,
) => {
    const { seq } = await params;

    const queryServer = new QueryClient();

    await queryServer.prefetchQuery({
        queryKey: [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq],
        queryFn: async () => {
            const result = (await API_EXHIBITION_DETAIL_SERVER(
                seq,
            )) as EXHIBITION_DETAIL_ITEM;

            return result;
        },
    });

    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <DetailWrapper seq={seq} />
        </HydrationBoundary>
    );
};
