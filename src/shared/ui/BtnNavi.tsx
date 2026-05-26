"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface BTN_NAVI extends LAYOUT_CHILD {
    label : string,
    href : string
}

export const BtnNavi = ({ label, href, children } : BTN_NAVI) => {

    const pathname = usePathname()

    
    return (
        <Link className="
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
        " href={href}>
            {label}
            {children}
        </Link>
    )
}