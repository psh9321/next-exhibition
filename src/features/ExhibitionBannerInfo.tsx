"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";

import { decode } from "he";

import { MapPinned, MapPinHouse, Phone, ArrowBigLeft } from 'lucide-react';

import { ExhibitionStatus } from "@/entities/exhibition/detail/util/exhibitionStatus";

import { useExhibitionDetailHook } from "@/entities/exhibition/detail/hook/useExhibitionDetailHook";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ImageError } from "@/shared/util/imgError";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { BtnToggleFavorite } from "@/features/BtnToggleFavorite";
import { BtnAddReview } from "@/entities/review/add/ui/BtnAddReview";
import { BtnMettingAddForm } from "./BtnMetting/BtnMettingAddForm";

export const ExhibitionBannerInfo = () => {

    const data = useExhibitionDetailHook() as EXHIBITION_DETAIL_ITEM;

    const navigation = useRouter();

    const currentExhibitionStatus = ExhibitionStatus(data?.["startDate"]??"", data?.["endDate"]??"");

    const statusClass = (() => {
        switch (currentExhibitionStatus) {
            case "전시 중" : return "bg-main-color"
            case "전시 예정" : return "bg-[#10B981]"
            case "전시 종료" : return "bg-[#52525B]"
        
            default: return ""
        }
    })();    

    return (
        <article className="pb-[10px]">
            <h2 className="sr-only">전시 정보 배너 박스</h2>
            <div className="flex flex-wrap py-[20px] text-basic-color">
                <button onClick={navigation.back} className="flex items-center mr-[10px]"><ArrowBigLeft size={35}/></button>

                <div className="inline-flex gap-[10px] w-full mt-[10px] [&>button]:flex [&>button]:items-center [&>button]:gap-[6px] [&>button]:p-[5px_10px] [&>button]:text-[1.1rem] [&>button]:rounded-[10px]">
                    <BtnMettingAddForm/>
                    <BtnToggleFavorite exhibitionInfo={data} />
                    <BtnAddReview/>
                </div>
            </div>
            <div className="flex gap-[20px]">
                <div className="relative w-[180px] h-[250px]">
                    <Image className="rounded-[10px]" fill unoptimized sizes="100vw" src={SrcHttpToHttps(data?.["imgUrl"]??"")} alt={`${decode(data?.["title"]??"")} 이미지`} loading="eager" onError={ImageError} />
                </div>
                <dl className="w-[calc(100%-200px)] font-bold text-basic-color [&>*]:flex [&>*]:items-start [&>*]:leading-[1.5] [&>dd]:mt-[15px] [&>dd]:ml-[20px] [&>dd>svg]:size-[24px] [&>dd>svg]:mr-[5px] [&>dd>p]:w-[calc(100%-24px)]">
                    <dt className="text-[#fff] text-[1.7rem]">{decode(data?.["title"]??"")}</dt>
                    <dd className="mb-[30px]">
                        <span className={`mr-[10px] px-[10px] text-[#fff] rounded-[6px] ${statusClass}`}>{currentExhibitionStatus}</span> {ExhibitionDateFormat(data?.["startDate"]??"")} ~ {ExhibitionDateFormat(data?.["endDate"]??"")}
                    </dd>
                    { data?.["placeAddr"] && <dd><MapPinned/> <p>{data?.["placeAddr"]}</p></dd> }
                    { data?.["place"] && <dd><MapPinHouse/> <p>{data?.["place"]}</p></dd> }
                    { data?.["phone"] && <dd><Phone/> <p>{data?.["phone"]}</p></dd> }
                </dl>
            </div>
        </article>
    )
}