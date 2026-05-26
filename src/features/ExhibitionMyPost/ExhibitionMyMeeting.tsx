"use client"

import Image from "next/image"
import Link from "next/link"

import { MyLatestPostLayout } from "./ui/MyLatestPostLayout"

export const ExhibitionMyMeeting = () => {
    
    return (
        <MyLatestPostLayout label="최근 등록된 모임">
            <ol className="space-y-[15px]">
                <li>
                    <Link href="" className="flex justify-between">
                        <div className="relative w-[80px] h-[110px]">
                            <Image 
                            className="rounded-[10px]"
                            fill sizes="100vw" unoptimized loading="eager" src={"https://www.culture.go.kr/upload/rdf/25/04/show_20250415142925884.jpg"} alt="ff" />
                        </div>
                        <dl className="w-[calc(100%-90px)] ml-[10px] text-basic-color font-bold [&>dd]:text-[0.85rem]">
                            <dt className="mb-[5px] text-[#fff]">테스트 모임</dt>
                            <dd>2026.07.11 (수) 14:30</dd>
                            <dd>3 / 5 명</dd>
                        </dl>
                    </Link>
                </li>
                <li>
                    <Link href="" className="flex justify-between">
                        <div className="relative w-[80px] h-[110px]">
                            <Image 
                            className="rounded-[10px]"
                            fill sizes="100vw" unoptimized loading="eager" src={"https://www.culture.go.kr/upload/rdf/25/04/show_20250415142925884.jpg"} alt="ff" />
                        </div>
                        <dl className="w-[calc(100%-90px)] ml-[10px] text-basic-color font-bold [&>dd]:text-[0.85rem]">
                            <dt className="mb-[5px] text-[#fff]">테스트 모임</dt>
                            <dd>2026.07.11 (수) 14:30</dd>
                            <dd>3 / 5 명</dd>
                        </dl>
                    </Link>
                </li>
                <li>
                    <Link href="" className="flex justify-between">
                        <div className="relative w-[80px] h-[110px]">
                            <Image 
                            className="rounded-[10px]"
                            fill sizes="100vw" unoptimized loading="eager" src={"https://www.culture.go.kr/upload/rdf/25/04/show_20250415142925884.jpg"} alt="ff" />
                        </div>
                        <dl className="w-[calc(100%-90px)] ml-[10px] text-basic-color font-bold [&>dd]:text-[0.85rem]">
                            <dt className="mb-[5px] text-[#fff]">테스트 모임</dt>
                            <dd>2026.07.11 (수) 14:30</dd>
                            <dd>3 / 5 명</dd>
                        </dl>
                    </Link>
                </li>

                <li>
                    <Link className="block p-[5px_10px] text-basic-color text-center border border-basic-color rounded-[6px]" href={"/meeting"}>전시 모임 더보기</Link>
                </li>
            </ol>
        </MyLatestPostLayout>
    )
}