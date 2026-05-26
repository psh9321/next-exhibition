'use client'

import { RefObject, useCallback, useRef, useState } from "react"

interface INTER_SECTION_OBSERVER {
    threshold? : number,
    root? : RefObject<HTMLElement | null>
}

export const useInterSectionObserver = <HTML extends HTMLElement>({
    threshold,
    root,
} : INTER_SECTION_OBSERVER) => {

    const observerRef = useRef<IntersectionObserver | null>(null);

    const [ isView, setIsView ] = useState<boolean>(false);

    const ref = useCallback((node: HTML | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (!node) return;

        observerRef.current = new IntersectionObserver(([entry]) => {
            setIsView(entry.isIntersecting);
        }, {
            threshold: threshold ?? 0,
            root: root?.current ?? null,
        });

        observerRef.current.observe(node);
    }, [threshold, root]);

    return { ref, isView }
}
