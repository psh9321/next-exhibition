"use client";

import Image from "next/image";
import Link from "next/link";

import { useShallow } from "zustand/shallow";

import { decode } from "he";

import { Li, Div, Dl } from "./_html";

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { SrcHttpToHttps } from "@/shared/lib/srcHttpToHttps";
import { ImageError } from "@/shared/lib/imgError";
import { ExhibitionDateFormat } from "@/shared/lib/dateFormat";
import { BodyScrollLock } from "@/shared/lib/bodyScrollLock";

export const ExhibitionItem = ({ item }: { item: EXHIBITION_ITEM }) => {

    const { SetLoadingStatus, loadingState } = useLoadingStore(
        useShallow((state) => ({
            SetLoadingStatus: state.SetLoadingStatus,
            loadingState : state.loadingStatus
        })),
    );

    function AnchorCallback() {
        if(loadingState) return 
        
        BodyScrollLock(true);
        SetLoadingStatus("route");
    }

    if(!item) return <></>

    return (
        <Li>
            <Link
                scroll={false}
                onClick={AnchorCallback}
                href={`/exhibition/${item?.["seq"]}`}
            >
                <Div>
                    <Image
                        fill
                        sizes="100vw"
                        src={SrcHttpToHttps(item?.["thumbnail"])}
                        alt={`${item?.["title"]} 썸네일 이미지`}
                        unoptimized
                        onError={ImageError}
                        loading="eager"
                    />
                </Div>
                <Dl>
                    <dt>{decode(item?.["title"])}</dt>
                    <dd className="place">{item?.["place"]}</dd>
                    <dd className="date">{item?`${ExhibitionDateFormat(item["startDate"])} ~ ${ExhibitionDateFormat(item["endDate"])}` : ""}</dd>
                    <dd className="category">
                        <span>{item?.["area"]}</span>
                    </dd>
                </Dl>
            </Link>
        </Li>
    );
};
