"use client"

import Link from "next/link";
import Image from "next/image"

import { ImageError } from "@/shared/util/imgError"
import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps"
import { DateParser } from "@/shared/util/dateParser";

import { useMettingPromiseListHook } from "@/entities/metting/list/promise/hook/useMettingPromiseListHook";

import { MettingPromiseEmpty } from "@/entities/metting/list/promise/ui/MettingPromiseEmpty";
import { decode } from "he";

export const MettingPromiseList = () => {

    const { data, promiseTotal } = useMettingPromiseListHook();

    return (
        <ol className="flex flex-wrap gap-[20px]">
            {
                promiseTotal === 0 ? 
                <MettingPromiseEmpty/>
                : 
                data?.pages.map(page => {
                    if(!page) return <></>
                    const list = (page as METTING_PROMISE_LIST)["list"];
                    
                    return list.map((item, i) => {

                        const diffDays = Math.ceil((new Date(item["mettingDate"]).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                        const { date, time } = DateParser(item["mettingDate"])

                        return <li className="w-[calc(50%-10px)]" key={`약속된모임-${i}-${decode(item?.["exhibitionTitle"])}`}>
                            <Link href={`/metting/detail/${item["_id"]}`} className="relative flex text-basic-color bg-[#222226] rounded-[10px] shadow-[5px_5px_5px_rgba(0,0,0,0.8)] overflow-hidden">
                                <div className="relative w-[160px] h-[230px]">
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
                                <dl className="block w-[calc(100%-160px)] p-[15px] text-left [&>dd]:text-[0.9rem]">
                                    <dt className="max-w-[calc(100%-30%)] mb-[20px] text-[1.15rem] truncate">{(item["mettingTitle"])}</dt>
                                    <dd className="block w-full text-main-color truncate">{decode(item["exhibitionTitle"])}</dd>
                                    <dd>{date} {time}</dd>
                                    <dd>{item["exhibitionPlace"]}</dd>
                                    <dd>{item["exhibitionPrice"]}</dd>
                                    <dd className="inline-block mt-[20px] p-[5px_10px] text-[#7f7f7e] text-[0.8rem] font-bold bg-[#302d2d] rounded-[10px]">{item["exhibitionArea"]}</dd>
                                </dl>
                                <p className="absolute top-[15px] right-[15px] block p-[5px_10px] text-[#fff] bg-main-color rounded-[10px]">D - {diffDays}</p>
                            </Link>
                        </li>
                    })
                })
            }
        </ol>
    )
}