"use client";

import { decode } from "he";

import { Article, Div, Dl } from "./_html";

import { ImageError } from "@/shared/lib/imgError";
import { SrcHttpToHttps } from "@/shared/lib/srcHttpToHttps";
import { ExhibitionDateFormat } from "@/shared/lib/dateFormat";
import Image from "next/image";


export const DetailContents = ({ item } : { item : EXHIBITION_DETAIL_ITEM }) => {

    return (
        <Article>
            <Div>
                <Image
                    width={300}
                    height={400}
                    src={SrcHttpToHttps(item["imgUrl"]) || "/img404.png"}
                    alt={`${decode(item["title"])} 썸네일 이미지`}
                    unoptimized
                    onError={ImageError}
                />
            </Div>
            <Dl className="info">
                <dt>Exhibition Infomation</dt>
            <dd className="date">
                {
                    (String(item["startDate"]) && String(item["endDate"])) ? `${ExhibitionDateFormat(item["startDate"])} ~ ${ExhibitionDateFormat(item["endDate"])}` : ""
                }
            </dd>
                {item["phone"] && (
                    <dd className="callNumber">{item["phone"]}</dd>
                )}
                {item["placeAddr"] && (
                    <dd className="address">{item["placeAddr"]}</dd>
                )}
                {item["price"] !== "무료" &&
                    item["price"] !== "무료관람" && (
                        <dd className="price">{item["price"]}</dd>
                    )}
                <dd className="category">
                    {item["price"] === "무료" ||
                        (item["price"] === "무료관람" && (
                            <span>{item["price"]}</span>
                        ))}
                    {item["realmName"] && (
                        <span>{item["realmName"]}</span>
                    )}
                    {item["area"] && <span>{item["area"]}</span>}
                    {item["sigungu"] && (
                        <span>{item["sigungu"]}</span>
                    )}
                </dd>
            </Dl>
        </Article>
    );
};
