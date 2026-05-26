"use client"

import { ExhibitionDetailTabMenu } from "@/features/ExhibitionDetailTabMenu";

import { ExhibitionMyMeeting } from "@/features/ExhibitionMyPost/ExhibitionMyMeeting";
import { LatestReview } from "@/features/ExhibitionMyPost/LatestReview";
import { ExhibitionDetailTabBox } from "@/widgets/ExhibitionDetailTabBox";
import { ExhibitionBannerInfo } from "@/features/ExhibitionBannerInfo";

import { AddReviewFormBox } from "@/features/AddReviewFormBox";

const ExhibitionDetailPageView = () => {

    return (
        <div className="flex justify-center">
            <h1 className="sr-only">전시 상세 정보</h1>

            <main className="w-[670px]">
                <div className="sticky top-0 z-[2] bg-[#11151E]">
                    <ExhibitionBannerInfo />
                    <ExhibitionDetailTabMenu/>
                    <AddReviewFormBox/>                     
                </div>
                <div className="mt-[20px]">
                    <ExhibitionDetailTabBox/>
                </div>
            </main>

            <div className="w-[300px] mt-[20px] ml-[30px]">
                <ExhibitionMyMeeting/>
                <div className="mt-[20px]"><LatestReview/></div>
            </div>
        </div>
    )
}

export default ExhibitionDetailPageView