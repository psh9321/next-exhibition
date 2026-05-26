"use client"

import { BtnMettingList } from "@/features/BtnMettingList"
import { MettingBannerInfo } from "@/features/MettingBannerInfo"

export const MettingBannerInfoBox = () => {

    return (
        <section className="sticky top-[0] flex justify-between flex-wrap py-[20px] bg-[#11151e] z-2"> 
            <h2 className="sr-only">메인 배너</h2>
            <MettingBannerInfo/>
            <div className="mt-[15px]">
                <BtnMettingList/>
            </div>
        </section>
    )
}