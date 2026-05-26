"use client"

import { MettingBannerInfoBox } from "@/widgets/MettingBannerInfoBox";
import { MettingInfoBox } from "@/widgets/MettingInfoBox";
import { MettingContentsBox } from "@/widgets/MettingContentsBox";

const MettingDetailPageView = () => {

    return (
        <div className="relative max-w-[980px] min-h-dvh mx-auto ">
            
            <MettingBannerInfoBox/>
            <div className="text-center">
                <MettingInfoBox/>
                <MettingContentsBox/>
            </div>
        </div>
    )
}

export default MettingDetailPageView
