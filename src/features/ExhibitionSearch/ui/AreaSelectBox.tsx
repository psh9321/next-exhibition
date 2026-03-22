'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react'

import { DropDownMenu } from '@/shared/ui/DropDownMenu';

import { useLoadingStore } from '@/shared/store/useLoadingStore';

export const AreaSelectBox = () => {

    const key = "searchArea";

    const areaData = [
        "지역 전체","서울", "경기", "세종", "대전", "대구", "부산", "광주", "제주", "강원", "경남", "경북", "울산", "인천", "전남", "전북", "충남", "충북"
    ].map(el => ({
        key : el,
        value : el.replace(/ /g, '')
    }));

    const router = useRouter();

    const searchParams = useSearchParams();

    const [ currentValue, SetCurrentValue ] = useState<DISTRICT | string>(searchParams.get(key)??"");

    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    function ValidateCallback(value : string) { 
        if(value === "지역전체" && currentValue === "") return
        if(value === currentValue) return
        
        SetCurrentValue(value as DISTRICT);
        // setArea(value as DISTRICT);

        const params = new URLSearchParams(searchParams.toString());

        if(value === "지역전체") params.delete(key);    
        else params.set(key, value); 
        
        /** 검색 로딩뷰 활성화 */
        SetLoadingStatus("search");

        router.replace(`?${params.toString()}`,{ scroll : false });
        
    };

    /** 전역 로딩뷰 비활성화 */
    useEffect(() => SetLoadingStatus(""),[searchParams, SetLoadingStatus])

    return (
        <>
            <DropDownMenu hiddenText='지역 선택' defaultValue={searchParams.get(key)??"지역"} data={areaData} validata={ValidateCallback}/>
        </>
    )
}