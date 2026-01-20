'use client'

import { create } from 'zustand'

interface SEARCH_STATUS_STORE {
    keyword : string,
    area : "지역" | "지역 전체" | DISTRICT,
    category : EXHIBITION_CATEGORY,
    SetKeyword : (keyword : string) => void
    SetArea : (area : DISTRICT) => void
    SetCategory : (category : EXHIBITION_CATEGORY) => void
}

export const useSearchStatusStore = create<SEARCH_STATUS_STORE>((set) => ({
    keyword : '',
    area : "지역",
    category : "A",
    
    SetKeyword(keyword) { set({ keyword }) },
    SetArea(area) { set({ area }) },
    SetCategory(category) { set({ category }) },
}))