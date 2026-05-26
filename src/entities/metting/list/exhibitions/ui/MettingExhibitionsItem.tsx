"use client"

import Link from "next/link"
import Image from "next/image"

import { ExhibitionDateFormat } from "@/shared/util/dateFormat"
import { ImageError } from "@/shared/util/imgError"
import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps"
import { ExhibitionStatus } from "@/entities/exhibition/detail/util/exhibitionStatus"
import { decode } from "he"

interface METTING_EXHIBITIONS_ITEM {
    item : METTING_EXHIBITION_LIST_ITEM
}

export const MettingExhibitionsItem = ({ item } : METTING_EXHIBITIONS_ITEM) => {

    const currentExhibitionStatus = ExhibitionStatus(item?.["exhibitionStartDate"]??"", item?.["exhibitionEndDate"]??"");

    const statusClass = (() => {
        switch (currentExhibitionStatus) {
            case "전시 중" : return "bg-main-color"
            case "전시 예정" : return "bg-[#10B981]"
            case "전시 종료" : return "bg-[#52525B]"
        
            default: return ""
        }
    })();

    return (
        <li className="[&.active>a]:border-main-color">
            <Link href={`/metting/exhibitions/${item["exhibitionSeq"]}`} className="relative flex h-[200px] text-basic-color bg-[#222226] border-[5px] border-[#222226] rounded-[10px] shadow-[5px_5px_5px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="relative inline-block w-[180px] h-full">
                    <Image
                        className="w-full h-full"
                        unoptimized
                        fill
                        sizes={"100vw"}
                        loading="eager"
                        src={SrcHttpToHttps(item["exhibitionThumbnail"])}
                        alt={`${decode(item["exhibitionTitle"])} 썸네일 이미지`}
                        onError={ImageError}
                    />
                </div>
                <dl className="block w-full p-[15px] text-left">
                    <dt className="max-w-[calc(100%-30%)] mb-[20px] text-[1.15rem] truncate">{decode(item["exhibitionTitle"])}</dt>
                    <dd className="block w-full text-[0.9rem] truncate">{"부산현대미술관"}</dd>
                    <dd className="date text-[0.9rem]">{ExhibitionDateFormat(item["exhibitionStartDate"])} ~ {item["exhibitionEndDate"]}</dd>
                    <dd>{item["exhibitionPrice"]}</dd>
                    <dd className="inline-block mt-[20px] p-[5px_10px] text-[#7f7f7e] text-[0.8rem] font-bold bg-[#302d2d] rounded-[10px]">{item["exhibitionArea"]}</dd>
                </dl>
                <p className="absolute top-[20px] right-[20px] inline-flex flex-col items-end gap-[10px] font-bold">
                    전체 모임 : {item["mettingsTotal"]}
                    <span className={`inline-block w-[75px] py-[5px] text-[#fff] text-center ${statusClass} rounded-[10px]`}>{currentExhibitionStatus}</span>
                </p>
            </Link>
        </li>
    )
}