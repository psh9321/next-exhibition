import { BodyScrollLock } from '@/shared/util/bodyScrollLock';
import { create } from 'zustand'

interface USE_REVIEW_ADD_STORE {
    isAdd : boolean;
    SetIsAddReview : (is : boolean) => void;
}

export const useReviewAddStore = create<USE_REVIEW_ADD_STORE>((set) => ({
    isAdd : false,
    
    SetIsAddReview(is) {
        set({ isAdd : is })
        BodyScrollLock(is);
    },
}))