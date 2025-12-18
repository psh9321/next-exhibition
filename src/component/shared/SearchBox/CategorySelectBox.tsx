'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useShallow } from "zustand/shallow"

import { useSearchStatusStore } from '@/store/useSearchStatusStore';
import { DropDownMenu } from '../DropDownMenu/Index';

import { EXHIBITION_CATEGORY } from "@/types/exhibition"
import { SearchLoadingElement } from '../Loading/Index';
import { useLoadingStore } from '@/store/useLoadingStore';

const categoryData = [ 
    { key : "공연/전시", value : "A"},
    { key : "행사/축제", value : "B"},
    { key : "교육/체험", value : "C"}
];

export const CategorySelectBox = () => {

    const key = "searchCategory";

    const router = useRouter();

    const searchParams = useSearchParams();

    const [ currentValue, SetCurrentValue ] = useState<EXHIBITION_CATEGORY | string>(searchParams.get(key)??"");

    const { setCategory } = useSearchStatusStore(useShallow((state) => ({
        setCategory : state.SetCategory
    })));

    const { loadingStatus, setLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus,
        setLoadingStatus : state.SetLoadingStatus
    })));

    const params = new URLSearchParams(searchParams.toString());

    function ValidateCallback(value : string) { 

        if(value === currentValue) return
         
        SetCurrentValue(value as EXHIBITION_CATEGORY);
        setCategory(value as EXHIBITION_CATEGORY); 

        if(value === "A") {
            if(params.has(key)) params.delete(key);
        }
        else {
            params.set(key, value); 
        }

        setLoadingStatus("search");
        
        router.replace(`?${params.toString()}`,{ scroll : false });
        
    };

    useEffect(() => {
        if(loadingStatus) setLoadingStatus("");
    },[searchParams, currentValue]);

    const defaultValue = categoryData.find(el => el["value"] === currentValue)?.["value"] ?? categoryData[0]["value"];

    return (
        <>
            <SearchLoadingElement/>
            
            <DropDownMenu hiddenText='카테고리 선택' defaultValue={defaultValue} data={categoryData} validata={ValidateCallback}/>        
        </>
    );
};