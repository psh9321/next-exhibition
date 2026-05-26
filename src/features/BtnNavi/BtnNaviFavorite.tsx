"use client"

import { TicketCheck } from 'lucide-react';

import Link from "next/link"
import { useFavoriteListHook } from '../../entities/favorite/list/hook/useFavoriteListHook';
import { usePathname } from 'next/navigation';

export const BtnNaviFavorite = () => {

    const { favoriteTotal } = useFavoriteListHook();

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
        `} href={"/favorite"}>
            <TicketCheck/> 관심 있는 전시
            {
                favoriteTotal > 0 && <span>{favoriteTotal}</span>
            }
        </Link>
    )
}