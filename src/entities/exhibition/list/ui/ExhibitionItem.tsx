"use client"

import Link from "next/link";

import Image from "next/image";

import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { ImageError } from "@/shared/util/imgError";


export const ExhibitionItem = ({ item } : { item: EXHIBITION_ITEM }) => {

    if(!item) return <></>

    return (
        <li className="block w-[calc(25%-15px)] max-w-[225px] min-w-[225px] shadow-[5px_5px_5px_rgba(0,0,0,0.8)] rounded-[10px] overflow-hidden">
            <Link href={`/exhibition/${item["seq"]}`} className="block">
                {/* max-w-[200px] max-h-[300px] */}
                <div className="relative w-full h-[260px] z-[-1]">
                    <Image
                        className="w-full h-full"
                        fill
                        unoptimized
                        sizes={"100vw"}
                        loading="eager"
                        src={SrcHttpToHttps(item["thumbnail"])}
                        alt={`${decode(item["title"])} 썸네일 이미지
                        `}
                        onError={ImageError}
                    />
                </div>
                <dl className="block w-full p-[15px_20px] text-left text-basic-color bg-[#222226]">
                    <dt className="h-[55px] mb-[10px] text-[1.15rem] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{decode(item["title"])}</dt>
                    <dd className="block w-full text-[0.9rem] truncate">{decode(item["place"])}</dd>
                    <dd className="date text-[0.9rem]">{`${ExhibitionDateFormat(item["startDate"])} ~ ${ExhibitionDateFormat(item["endDate"])}`}</dd>
                    <dd className="inline-block mt-[40px] p-[5px_10px] text-[#7f7f7e] text-[0.8rem] font-bold bg-[#302d2d] rounded-[10px]">{item["area"]}</dd>
                </dl>
            </Link>
        </li>
    )
}