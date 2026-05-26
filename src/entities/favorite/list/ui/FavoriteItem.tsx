"use client"

import Link from "next/link";

import Image from "next/image";

import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { ImageError } from "@/shared/util/imgError";
import { ExhibitionStatus } from "@/entities/exhibition/detail/util/exhibitionStatus";

export const FavoriteItem = ({ item } : { item : FAVORITE_ITEM }) => {

    const currentExhibitionStatus = ExhibitionStatus(item?.["exhibitionStartDate"]??"", item?.["exhibitionEndDate"]??"");

    const title = decode(item?.["exhibitionTitle"]);

    const statusBgClass = (() => {
        switch (currentExhibitionStatus) {
            case "전시 중" : return "main-color"
            case "전시 예정" : return "[#10B981]"
            case "전시 종료" : return "[#52525B]"
        
            default: return ""
        }
    })();

    return (
        <li className="block w-[calc(25%-15px)] max-w-[225px] min-w-[225px] shadow-[5px_5px_5px_rgba(0,0,0,0.8)] rounded-[10px] overflow-hidden">
            <Link href={`/exhibition/${item?.["exhibitionSeq"]}`} className="block">
                <div className="relative w-full h-[260px]">
                    <Image
                        className="w-full h-full"
                        fill
                        unoptimized
                        sizes={"100vw"}
                        loading="eager"
                        src={SrcHttpToHttps(item?.["exhibitionImg"])}
                        alt={`${title} 썸네일 이미지
                        `}
                        onError={ImageError}
                    />
                </div>
                <dl className="block w-full p-[15px_20px] text-left text-basic-color bg-[#222226]
                [&>dd.child]:inline-block
                [&>dd.child]:p-[5px_10px]
                [&>dd.child]:text-[0.8rem]
                [&>dd.child]:font-bold
                [&>dd.child]:rounded-[10px]
                ">
                    <dt className="h-[55px] mb-[10px] text-[1.15rem] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{title}</dt>
                    <dd className="mb-[10px] text-[0.9rem]">{item?`${ExhibitionDateFormat(item?.["exhibitionStartDate"])} ~ ${ExhibitionDateFormat(item?.["exhibitionEndDate"])}` : ""}</dd>
                    <dd className="child border text-[#7f7f7e]">{item?.["exhibitionArea"]}</dd>
                    <dd className={`child ml-[10px] border text-[#fff] bg-${statusBgClass} border-${statusBgClass}`}>{currentExhibitionStatus}</dd>
                </dl>
            </Link>
        </li>
    )
}