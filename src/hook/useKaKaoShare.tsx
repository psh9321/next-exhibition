'use client'

import { useEffect } from "react"

export const useKaKaoShareHook = () => {
    
    useEffect(() => {
        if (!window.Kakao) return;
    
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
        }
    }, []);

    return {}
}