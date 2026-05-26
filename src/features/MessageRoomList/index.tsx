"use client"

import Image from "next/image"

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps"
import { MessageRoomEmpty } from "./components/MessageRoomEmpty";
import Link from "next/link";

export const MessageRoomList = () => {

    const data = [1,2,3,4,5,6,7,8,9,10];
    // const data = [] as number[];

    

    return (
        <ul className="relative w-full h-full space-y-[25px]">
            {
                data.length === 0 ? 
                    <MessageRoomEmpty/> 
                :
                data.map((_,i) => {
                    return <li key={`더미데이터-메세지-${i}`} className={`
                    relative
                    border
                    border-transparent
                    rounded-[10px]
                    [&.active]:border-main-color
                    ${i === 0 && "active"}
                    [&:nth-child(n+2)::after]:content-['']                    
                    [&:nth-child(n+2)::after]:absolute
                    [&:nth-child(n+2)::after]:top-[-10px]
                    [&:nth-child(n+2)::after]:left-1/2
                    [&:nth-child(n+2)::after]:-translate-1/2
                    [&:nth-child(n+2)::after]:block
                    [&:nth-child(n+2)::after]:w-[90%]
                    [&:nth-child(n+2)::after]:h-[2px]
                    [&:nth-child(n+2)::after]:bg-border-color
                    `}>
                        <Link className="flex gap-[10px] p-[10px]" href="">
                            <div className="relative block size-[50px]">
                                <Image className="rounded-[100%]" fill src={SrcHttpToHttps("http://www.culture.go.kr/upload/rdf/25/04/show_20250415142925884.jpg")} alt="더미" loading="eager" />
                            </div>
                            <dl className="w-[calc(100%-60px)] font-bold [&>*]:truncate [&>dd:nth-of-type(n+2)]:text-[0.8rem]">
                                <dt>모임 이름</dt>
                                <dd className="mb-[10px] text-main-color">패트릭 블랑: 수직정원</dd>
                                <dd>모임 날짜 : 2026.07.11 (토) 14:30</dd>
                                <dd>현재/총원 : 3명 / 5명</dd>
                            </dl>
                        </Link>            
                    </li>
                })
            }
        </ul>
    )
}