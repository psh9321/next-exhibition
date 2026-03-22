'use client'

import { useShallow } from "zustand/shallow";

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { FetchLoadingIcon, RouteLoadingIcon, SearchLoadingIcon } from "./_icon";

export const LoadingView = () => {

    const { loadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus
    })));

    switch (loadingStatus) {
        case "fetch" : return <FetchLoadingIcon/>
        case "route" : return <RouteLoadingIcon/>
        case "search" : return <SearchLoadingIcon/>
    
        default: return <></>
    }
};