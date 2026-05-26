'use client'

import { create } from 'zustand'

type LOADING_STATUS = "" | "전시정보불러오기" | "전시검색" | "검색 초기화" | "route";

interface LOADING_STORE {
    loadingStatus : LOADING_STATUS,
    SetLoadingStatus : (loadingStatus : LOADING_STATUS) => void
}

export const useLoadingStore = create<LOADING_STORE>(( set ) => ({
    loadingStatus : "",
    SetLoadingStatus(loadingStatus) { set({loadingStatus}) }
}))