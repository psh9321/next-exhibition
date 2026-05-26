"use client"

import Image from "next/image"

import { CalendarClock, UsersRound, UserStar, MapPinHouse } from 'lucide-react';

import { ImageError } from "@/shared/util/imgError"
import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps"
import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook";

export const MettingBannerInfo = () => {

    const { statusMetting, mettingDate, mettingTitle, members, exhibitionTitle, exhibitionPlace, totalMember, createUser, exhibitionThumbnail } = useMettingDetailHook();

    return (
        <>
            <div className="relative inline-block w-[220px] h-[290px] rounded-[10px] overflow-hidden">
                <Image
                    className="w-full h-full"
                    unoptimized
                    fill
                    sizes={"100vw"}
                    loading="eager"
                    src={SrcHttpToHttps(exhibitionThumbnail??"")}
                    alt={`${exhibitionTitle} 썸네일 이미지`}
                    onError={ImageError}
                />
            </div>
            <div className="w-[calc(100%-240px)]">
                <p className="inline-block mb-[5px] p-[5px_10px] text-[#fff] bg-[green] rounded-[10px]">{statusMetting}</p>
                <dl className="block w-full font-bold [&>dd]:flex [&>dd]:items-center [&>dd]:gap-[10px] [&>dd:nth-child(n+3)]:mt-[15px] [&>dd]:text-basic-color [&>dd]:text-[1.1rem]">
                    <dt className="text-[#fff] text-[1.5rem] break-keep">
                        {mettingTitle}
                    </dt>
                    <dd className="mb-[30px] text-main-color! text-[1rem]!">{exhibitionTitle}</dd>
                    <dd><MapPinHouse/> {exhibitionPlace}</dd>
                    <dd><CalendarClock/> {mettingDate["date"]} {mettingDate["time"]} </dd>
                    <dd><UsersRound/> {members?.length} / {totalMember} 명</dd>
                    <dd><UserStar/> {createUser?.["name"]}</dd>
                </dl>
            </div>
        </>
    )
}