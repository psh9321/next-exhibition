"use client"

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { ExhibitionListFetchIcon, ExhibitionListSearchIcon, ExhibitionListSearchResetIcon } from "./_icon"

export const LoadingView = () => {
    
    const loadingStatus = useLoadingStore(state => state.loadingStatus);

    switch (loadingStatus) {
        case "전시정보불러오기" : return <ExhibitionListFetchIcon/>;
        case "전시검색" : return <ExhibitionListSearchIcon/>;
        case "검색 초기화" : return <ExhibitionListSearchResetIcon/>;
    
        default: return <></>
    }
}