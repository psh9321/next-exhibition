'use client'

import { create } from 'zustand'

type LOADING_STATUS = "" | "fetch" | "search";

interface INTERFACE {
    loadingStatus : LOADING_STATUS,
    SetLoadingStatus : (loadingStatus : LOADING_STATUS) => void
}

export const useLoadingStore = create<INTERFACE>(( set ) => ({
    loadingStatus : "",
    SetLoadingStatus(loadingStatus) { set({loadingStatus}) }
}))