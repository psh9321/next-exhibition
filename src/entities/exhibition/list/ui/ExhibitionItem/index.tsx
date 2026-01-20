"use client";

import Image from "next/image";
import Link from "next/link";

import { useShallow } from "zustand/shallow";

import { decode } from "he";

import { Li, Div, Dl } from "./_html";

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { RouteLoadingElement } from "@/shared/ui/Loading";

import { SrcHttpToHttps } from "@/shared/lib/srcHttpToHttps";
import { ImageError } from "@/shared/lib/imgError";
import { ExhibitionDateFormat } from "@/shared/lib/dateFormat";
import { BodyScrollLock } from "@/shared/lib/bodyScrollLock";

export const ExhibitionItem = ({ item }: { item: EXHIBITION_ITEM }) => {
    if (!item) return <></>;

    const { SetLoadingStatus } = useLoadingStore(
        useShallow((state) => ({
            SetLoadingStatus: state.SetLoadingStatus,
        })),
    );

    function AnchorCallback() {
        BodyScrollLock(true);
        SetLoadingStatus("route");
    }

    const { thumbnail, title, place, area, startDate, endDate, seq } = item;

    const exhibitionDate = (String(startDate) && String(endDate)) ? `${ExhibitionDateFormat(startDate)} ~ ${ExhibitionDateFormat(endDate)}` : "";

    return (
        <Li>
            <Link scroll={false} onClick={AnchorCallback} href={`/exhibition/${seq}`}>
                <Div>
                    <Image
                        fill
                        sizes="100vw"
                        src={SrcHttpToHttps(thumbnail)}
                        alt={`${title} 썸네일 이미지`}
                        unoptimized
                        onError={ImageError}
                        loading="eager"
                    />
                </Div>
                <Dl>
                    <dt>{decode(title)}</dt>
                    <dd className="place">{place}</dd>
                    <dd className="date">{exhibitionDate}</dd>
                    <dd className="category">
                        <span>{area}</span>
                    </dd>
                </Dl>
            </Link>

            <RouteLoadingElement/>
        </Li>
    );
};
