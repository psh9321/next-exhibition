import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { API_EXHIBITION_LIST_SERVER } from "@/entities/exhibition/list/api/exhibition.list.server"

import IndexPageView from "./_view";

export const metadata = {
    metadataBase: new URL("https://example.com"),
    title: {
      default: "Discover Exhibitions",
      template: "%s | 전시 정보 플랫폼",
    },
    description: "전국 전시 정보를 한눈에 확인하세요",
    openGraph: {
      siteName: "Discover Exhibitions 전시 정보 플랫폼",
      type: "website",
    },
};

interface SEARCH_BOX_FORM_VALUE {
    searchKeyword? : string,
    searchStartDate? : string,
    searchEndDate? : string,
    searchArea? : DISTRICT,
    searchCategory : EXHIBITION_CATEGORY,
}

interface SEARCH_RESULT_INTERFACE {
    searchParams: Promise<SEARCH_BOX_FORM_VALUE>
}

const IndexPageServer = async ({ searchParams } : SEARCH_RESULT_INTERFACE) => {

    const queryServer = new QueryClient();
    
    const { searchArea, searchKeyword, searchCategory } = await searchParams;
    // new URLSearchParams()

    const queryKeyObj : {
        [key : string] : string
    } = {};

    if(searchArea) queryKeyObj["searchArea"] = searchArea;
    if(searchKeyword) queryKeyObj["searchKeyword"] = searchKeyword;
    if(searchCategory) queryKeyObj["searchCategory"] = searchCategory;

    await queryServer.prefetchInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"],"list", queryKeyObj],
        queryFn : async ({pageParam}) => {

            const params : OPEN_API_QUERY_DATA = {
                PageNo : String(pageParam),
                numOfrows : "24",
                serviceTp : "A",        
            }

            if(searchArea) params["sido"] = searchArea as DISTRICT;
            if(searchKeyword) params["keyword"] = searchKeyword;
            if(searchCategory) params["serviceTp"] = searchCategory;

            const result = await API_EXHIBITION_LIST_SERVER(params);

            return result
        },
        initialPageParam: 1,
        getNextPageParam : (lastPage : OPEN_API_CLIENT_RESPONSE_DATA | null) => {

            if(!lastPage) return undefined

            const { page, total, limit } = lastPage as OPEN_API_CLIENT_RESPONSE_DATA;
            
            const totalPage = Math.ceil(total/limit);

            if(page < totalPage) return page+1;

            return undefined
        }
    })

    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <IndexPageView/>
        </HydrationBoundary>
    );
};

export default IndexPageServer;