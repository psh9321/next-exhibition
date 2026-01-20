"use client"

import { decode } from "he"

import { Dl } from "./_html"
import { ExhibitionDateFormat } from "@/shared/lib/dateFormat"

export const DetailHead = ({ item } : { item : EXHIBITION_DETAIL_ITEM }) => {
    return (
        <Dl>
            <dt>Exhibition Details</dt>
            <dd className="title">{decode(item["title"])}</dd>
            <dd className="date">
                {
                    (String(item["startDate"]) && String(item["endDate"])) ? `${ExhibitionDateFormat(item["startDate"])} ~ ${ExhibitionDateFormat(item["endDate"])}` : ""
                }
            </dd>
            <dd className="place">{item?.["place"]}</dd>
        </Dl>
    )
}