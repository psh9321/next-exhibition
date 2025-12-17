'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useRef } from 'react';

import { useShallow } from "zustand/shallow"

import { Search } from 'lucide-react';

import { useSearchStatusStore } from '@/store/useSearchStatusStore';

import { Div, Input } from "./_html";

import { useLoadingStore } from "@/store/useLoadingStore";
import { SearchLoadingElement } from '../Loading/Index';

export const SearchInputBox = () => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const { keyword, setKeyowrd } = useSearchStatusStore(useShallow((state) => ({
        keyword : state.keyword,
        setKeyowrd : state.SetKeyword,
    })));

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    
    const { loadingStatus, setLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus,
        setLoadingStatus : state.SetLoadingStatus
    })));
    
    const key = "searchKeyword";

    function OnInputCallback(e : React.InputEvent<HTMLInputElement>) {

        const value = e.currentTarget.value.replace(/ /g, '');

        if(value === searchParams.get(key)) return

        setKeyowrd(value);

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
                if(params.has(key)) params.delete(key)
                else return
            }

            setLoadingStatus("search")

            router.replace(`?${params.toString()}`,{ scroll : false });
        }, 500);
    }

    useEffect(() => {
        if(loadingStatus) setLoadingStatus("")
    },[searchParams])

    return (
        <>
            <SearchLoadingElement/>
            
            <Div>
                <Search/>
                <Input defaultValue={searchParams.get("searchKeyword")??keyword} type="text" placeholder="전시 제목, 장소 검색" onInput={OnInputCallback} />
            </Div>
        </>
        
    )
}