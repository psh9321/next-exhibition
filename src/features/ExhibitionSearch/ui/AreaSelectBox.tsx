'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react'

import { useShallow } from "zustand/shallow"

import { DropDownMenu } from '@/shared/ui/DropDownMenu';
import { SearchLoadingElement } from '@/shared/ui/Loading';

import { useLoadingStore } from '@/shared/store/useLoadingStore';

const areaData = [
    "지역 전체","서울", "경기", "세종", "대전", "대구", "부산", "광주", "제주", "강원", "경남", "경북", "울산", "인천", "전남", "전북", "충남", "충북"
].map(el => ({
    key : el,
    value : el.replace(/ /g, '')
}));

export const AreaSelectBox = () => {

    const key = "searchArea";

    const router = useRouter();

    const searchParams = useSearchParams();

    const [ currentValue, SetCurrentValue ] = useState<DISTRICT | string>(searchParams.get(key)??"");

    const { loadingStatus, setLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingStatus : state.loadingStatus,
        setLoadingStatus : state.SetLoadingStatus
    })));

    const params = new URLSearchParams(searchParams.toString());

    function ValidateCallback(value : string) { 
        if(value === "지역전체" && currentValue === "") return
        if(value === currentValue) return
        
        SetCurrentValue(value as DISTRICT);
        // setArea(value as DISTRICT);

        if(value === "지역전체") params.delete(key);    
        else params.set(key, value); 
        
        setLoadingStatus("search");

        router.replace(`?${params.toString()}`,{ scroll : false });
        
    };

    useEffect(() => {
        if(loadingStatus) setLoadingStatus("");
    },[searchParams])

    return (
        <>
            <SearchLoadingElement/>
            <DropDownMenu hiddenText='지역 선택' defaultValue={searchParams.get(key)??"지역"} data={areaData} validata={ValidateCallback}/>
        </>
    )
}