'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { DropDownMenu } from '@/shared/ui/DropDownMenu';

import { useLoadingStore } from '@/shared/store/useLoadingStore';

export const CategorySelectBox = () => {

    const key = "searchCategory";

    const categoryData = [ 
        { key : "공연/전시", value : "A"},
        { key : "행사/축제", value : "B"},
        { key : "교육/체험", value : "C"}
    ];
    
    const router = useRouter();

    const searchParams = useSearchParams();

    const [ currentValue, SetCurrentValue ] = useState<EXHIBITION_CATEGORY | string>(searchParams.get(key)??"");

    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    function ValidateCallback(value : string) { 

        if(value === "A" && currentValue === "") return
        if(value === currentValue) return
         
        SetCurrentValue(value as EXHIBITION_CATEGORY);

        const params = new URLSearchParams(searchParams.toString());

        if(value === "A") {
            if(params.has(key)) params.delete(key);
        }
        else {
            params.set(key, value); 
        }
        
        /** 검색 로딩뷰 활성화 */
        SetLoadingStatus("search");

        router.replace(`?${params.toString()}`,{ scroll : false });
        
    };

    const defaultValue = categoryData.find(el => el["value"] === currentValue)?.["value"] ?? categoryData[0]["value"];

    /** 검색 로딩뷰 비활성화 */
    useEffect(() => SetLoadingStatus(""),[searchParams, SetLoadingStatus])
    
    return (
        <>
            <DropDownMenu hiddenText='카테고리 선택' defaultValue={defaultValue} data={categoryData} validata={ValidateCallback}/>        
        </>
    );
};