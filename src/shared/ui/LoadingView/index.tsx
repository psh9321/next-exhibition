'use client'

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { FetchLoadingIcon, RouteLoadingIcon, SearchLoadingIcon } from "./_icon";

export const LoadingView = () => {

    const loadingStatus = useLoadingStore(state => state.loadingStatus);

    switch (loadingStatus) {
        case "fetch" : return <FetchLoadingIcon/>
        case "route" : return <RouteLoadingIcon/>
        case "search" : return <SearchLoadingIcon/>
    
        default: return <></>
    }
};