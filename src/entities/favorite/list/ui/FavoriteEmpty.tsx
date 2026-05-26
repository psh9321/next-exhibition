"use client"

import Link from "next/link"

import { TicketX } from "lucide-react"

export const FavoriteEmpty = () => {

    return (
        <li className='w-full mt-[150px] text-basic-color text-center'>
            <TicketX className='inline-block' size={45}/>
            <dl className="mt-[15px] font-bold">
                <dt className="text-[1rem]">`관심있는 전시가 없습니다.</dt>
                <dd className="mt-[10px] text-[2rem]">{`" 전시를 찾아보세요. "`}</dd>
            </dl>
            <Link href={"/"} className="inline-block mt-[25px] p-[10px_15px] text-[#fff] bg-main-color rounded-[10px]">전시 찾기</Link>
        </li>
    )
}