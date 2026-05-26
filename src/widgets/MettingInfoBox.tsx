"use client"

import { MettingInfo } from "@/features/MettingInfo"
import { MettingMembers } from "@/features/MettingMembers"

export const MettingInfoBox = () => {

    return (
        <section className="flex justify-between mt-[20px] p-[20px] bg-[#0D0F17] border-[2px] border-border-color rounded-[10px]">
            <h2 className="sr-only">정보 박스</h2>
            <MettingInfo/>
            <MettingMembers/>
        </section>
    )
}