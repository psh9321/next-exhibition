"use client"

import { SearchArea } from "./component/SearchArea";
import { SearchInput } from "./component/SearchInput";
import { SearchType } from "./component/SearchType";

export const ExhibitionSearch = () => {

    return (
        <article className="w-[450px]">
            <h2 className="sr-only">전시 검색</h2>
            <SearchInput/>
            <div className="flex items-center gap-[10px] mt-[10px]">
                <SearchType/>
                <SearchArea/>
            </div>
        </article>
    )
}