"use client"

import { CalendarClock } from 'lucide-react';

import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useMettingPromiseListHook } from '@/entities/metting/list/promise/hook/useMettingPromiseListHook';

export const BtnNaviMettingPromise = () => {

    const { promiseTotal } = useMettingPromiseListHook();

    const pathname = usePathname();

    return (
        <Link className={`
            relative
            inline-flex
            items-center
            gap-[10px]
            text-basic-color
            text-[1.2rem]
            [&>span]:block
            [&>span]:size-[28px]
            [&>span]:leading-[28px]
            [&>span]:text-center
            [&>span]:text-[#dedae6]
            [&>span]:text-[0.8rem]
            [&>span]:rounded-[100%]
            [&>span]:bg-main-color
            [&.active]:text-main-color        
        `} href={"/metting/promise"}>
            <CalendarClock/> 약속된 모임
            {
                promiseTotal > 0 && <span>{promiseTotal}</span>
            }
        </Link>
    )
}