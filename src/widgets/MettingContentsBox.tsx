"use client"

import { Megaphone } from 'lucide-react';

import { MettingContents } from "@/features/MettingContents"

export const MettingContentsBox = () => {
    
    return (
        <section className="h-[calc(100%-90px)] mt-[40px] p-[20px] bg-[#0D0F17] border-[2px] border-border-color rounded-[10px]">
                <h3 className="flex items-center mb-[30px] text-[#fff] text-[1.4rem] font-bold"><Megaphone className="mr-[5px] stroke-main-color"/> 모임 소개</h3>
            <MettingContents/>
        </section>
    )
}