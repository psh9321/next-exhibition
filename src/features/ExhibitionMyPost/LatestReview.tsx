"use client"

import Image from "next/image"

import { MyLatestPostLayout } from "./ui/MyLatestPostLayout"
import { useReviewListHook } from "@/entities/review/list/hook/useReviewListHook"
import { useParams } from "next/navigation"
import { DateFormat } from "@/shared/util/dateFormat"
import { NotepadTextDashed } from "lucide-react"
import { PeanutLoader } from "@/shared/ui/PeanutLoader"

export const LatestReview = () => {

    const { seq } = useParams<{seq : string}>()

    const { data, reviewTotal, isLoading } = useReviewListHook(seq, false);

    
    return (
        <MyLatestPostLayout label="최근 등록된 후기">
            {
                isLoading ? <PeanutLoader className="absolute top-1/2 left-1/2 -translate-1/2"/>
                :
            <ol className="space-y-[15px]">
                {
                    reviewTotal === 0 ? 
                    <li className="text-basic-color text-center">
                        <NotepadTextDashed size={30} className="inline-block mb-[10px]"/>
                        <p className="text-basic-color text-center text-[0.9em] font-bold">
                            등록된 후기가 없습니다.
                        </p>
                    </li>
                    :
                    data?.pages[0]?.list.slice(0,3).map((el, i) => {
                        return (
                            <li key={`최근등록된후기-${i}-${el?.["contents"]}`} className="flex justify-between">
                                <div className="relative block size-[40px]">
                                    <Image className="rounded-[100%]" fill unoptimized sizes="100vw" src={"/profile.jpeg"} alt="fa" loading="eager" />
                                </div>
                                <dl className="w-[calc(100%-50px)] text-basic-color text-[0.85rem] font-bold">
                                    <dt>{el["writerName"]}</dt>
                                    <dd>{DateFormat(el["updatedAt"])}</dd>
                                    <dd className="mt-[10px] text-[#fff] text-[1rem] line-clamp-2">{el["contents"]}</dd>
                                </dl>
                            </li>
                        )
                    })
                }
            </ol>
            }
        </MyLatestPostLayout>
    )
}