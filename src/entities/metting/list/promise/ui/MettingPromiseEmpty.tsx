"use client"

import Link from "next/link"

import { CalendarX } from "lucide-react"

export const MettingPromiseEmpty = () => {

    return (
        <li className='w-full mt-[150px] text-basic-color text-center'>
            <CalendarX className='inline-block' size={45}/>
            <dl className="mt-[15px] font-bold">
                <dt className="text-[1rem]">약속된 모임이 없습니다.</dt>
                <dd className="mt-[10px] text-[2rem]">{`" 참여하고 싶은 모임을 찾아보세요. "`}</dd>
            </dl>
            <Link href={"/metting"} className="inline-block mt-[25px] p-[10px_15px] text-[#fff] bg-main-color rounded-[10px]">모임 찾기</Link>
        </li>
    )
}