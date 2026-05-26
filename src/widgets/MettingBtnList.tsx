"use client"

import { BtnMettingToggle } from "@/features/BtnMetting/BtnMettingToggle"

export const MettingBtnList = () => {

    return (
        <ul className="flex gap-[10px]">
            <li><BtnMettingToggle/></li>
            <li></li>
        </ul>
    )
}