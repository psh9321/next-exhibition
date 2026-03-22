'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useRef } from 'react';

import { Search } from 'lucide-react';

import { Div, Input } from "./_html";

import { useLoadingStore } from "@/shared/store/useLoadingStore";

export const SearchInputBox = () => {

    const key = "searchKeyword";

    const router = useRouter();

    const searchParams = useSearchParams();

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    
    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    function OnInputCallback(e : React.InputEvent<HTMLInputElement>) {

        const value = e.currentTarget.value.replace(/ /g, '');

        if(value === searchParams.get(key)) return

        if(debounceTimer["current"]) {
            clearTimeout(debounceTimer["current"]);
            debounceTimer["current"] = null;
        }

        debounceTimer["current"] = setTimeout(() => {
            
            const params = new URLSearchParams(searchParams.toString());

            if(value) {
                params.set(key, value);   
            }
            else {
                if(!params.has(key)) return

                params.delete(key);
            }

            /** 검색 로딩뷰 활성화 */
            SetLoadingStatus("search")
            
            router.replace(`?${params.toString()}`,{ scroll : false });
        }, 500);
    }

    /** 검색 로딩뷰 비활성화 */
    useEffect(() => SetLoadingStatus(""),[searchParams, SetLoadingStatus]);

    return (
        <>
            <Div>
                <Search/>
                <Input defaultValue={searchParams.get("searchKeyword")??""} type="text" placeholder="전시 제목, 장소 검색" onInput={OnInputCallback} />
            </Div>
        </>
        
    )
}