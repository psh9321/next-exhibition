"use client"

import { SideMenu } from "@/features/SideMenu"

export const LayoutWrapper = ({ children } : LAYOUT_CHILD) => {
    return (
        <div className="relative flex max-w-[1920px] mx-auto">
            <SideMenu/>
            <div className="w-[calc(100%-242px)]">
                {children}
            </div>
        </div>
    )
}