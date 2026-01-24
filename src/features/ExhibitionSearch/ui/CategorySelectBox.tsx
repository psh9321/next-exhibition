'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useShallow } from "zustand/shallow"

import { DropDownMenu } from '@/shared/ui/DropDownMenu';
import { SearchLoadingElement } from '@/shared/ui/Loading';

import { useLoadingStore } from '@/shared/store/useLoadingStore';

const key = "searchCategory";

const categoryData = [ 
    { key : "공연/전시", value : "A"},
    { key : "행사/축제", value : "B"},
    { key : "교육/체험", value : "C"}
];

export const CategorySelectBox = () => {
    
    const router = useRouter();

    const searchParams = useSearchParams();

    const [ currentValue, SetCurrentValue ] = useState<EXHIBITION_CATEGORY | string>(searchParams.get(key)??"");

    const { loadingStatus, setLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus,
        setLoadingStatus : state.SetLoadingStatus
    })));

    const params = new URLSearchParams(searchParams.toString());

    function ValidateCallback(value : string) { 

        if(value === "A" && currentValue === "") return
        if(value === currentValue) return
         
        SetCurrentValue(value as EXHIBITION_CATEGORY);

        if(value === "A") {
            if(params.has(key)) params.delete(key);
        }
        else {
            params.set(key, value); 
        }
        
        setLoadingStatus("search");

        router.replace(`?${params.toString()}`,{ scroll : false });
        
    };

    const defaultValue = categoryData.find(el => el["value"] === currentValue)?.["value"] ?? categoryData[0]["value"];

    useEffect(() => {
        if(loadingStatus) setLoadingStatus("");
    },[searchParams])
    
    return (
        <>
            <SearchLoadingElement/>
            
            <DropDownMenu hiddenText='카테고리 선택' defaultValue={defaultValue} data={categoryData} validata={ValidateCallback}/>        
        </>
    );
};