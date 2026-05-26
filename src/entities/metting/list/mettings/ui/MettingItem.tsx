"use client"

import Image from "next/image"
import Link from "next/link"

import { DateParser } from "@/shared/util/dateParser"

interface METTING_ITEM {
    item : METTING_METTINGS_LIST_ITEM
}

export const MettingItem = ({ item } : METTING_ITEM) => {

    const mettingDate = DateParser(item["mettingDate"]);

    const mettingStatus = (() => {
        if(new Date() < new Date(item["mettingDate"])) {
            if(item["members"]?.length === item["totalMember"]) return "모집 마감"
            else return "모집 중"
        }
        else {
            return "모임 종료"
        }
    })();

    return (
        <li  className="relative p-[15px] text-basic-color border border-basic-color rounded-[10px]">
            <article className="flex items-center">
                <h2 className="sr-only">참여인원 목록</h2>
                <ul className="flex [&>li]:bg-[#222226] [&>li]:rounded-[100%]">
                    {
                        item["members"].map((el, j) => {
                            return <li className={`relative left-[-${10*j}px]`} key={`모임목록참여인원-${el["name"]}-${j}`}>
                                <Image width={30} height={30} sizes="100vw" src={`${el["isProfileImg"] ? "" : "/user.profile.null.png"}`} alt={`${el["name"]} 프로필 이미지`} />
                            </li>
                        })
                    }
                </ul>
                {
                    item["members"].length > 3 && <p className="relative left-[-15px] text-[0.8rem] font-bold">+ {item["members"].length-3}</p>
                }
            </article>
            <dl className="my-[10px_30px]">
                <dt className="truncate">{item["mettingTitle"]}</dt>
                <dd className="text-[0.9rem]">{mettingDate["date"]} {mettingDate["time"]}</dd>
            </dl>
            <p className="absolute top-[15px] right-[15px] inline-block p-[5px_10px] text-[#fff] bg-[green] rounded-[10px]">
                {mettingStatus}
            </p>
            <Link href={`/metting/detail/${item["_id"]}`} className="block w-full py-[10px] text-[#fff] text-center bg-main-color rounded-[10px]">모임 보기</Link>
        </li>
    )
}