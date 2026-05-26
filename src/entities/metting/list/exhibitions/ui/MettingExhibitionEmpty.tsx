"use client"

import Link from "next/link"

import { TicketX } from "lucide-react"

export const MettingExhibitionEmpty = () => {
    return (
        <li className='w-full mt-[150px] text-basic-color text-center'>
            <TicketX className='inline-block' size={45}/>
            <dl className="mt-[15px] font-bold">
                <dt className="text-[1rem]">둥록된 모임이 없습니다.</dt>
                <dd className="mt-[10px] text-[2rem]">{`" 첫번째로 모임을 등록해보세요. "`}</dd>
            </dl>
            <Link href={"/"} className="inline-block mt-[25px] p-[10px_15px] text-[#fff] bg-main-color rounded-[10px]">모임을 만들 전시 찾기</Link>
        </li>
    )
}