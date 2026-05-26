"use client"

import { ExhibitionSearch } from "@/features/ExhibitionSearch"

export const ExhibitionSearchBox = () => {
    return (
        <section className="sticky top-[0] w-full mb-[30px] py-[20px] bg-[#11151E] z-[1]">
            <h2 className="sr-only">전시 검색 박스</h2>
            <ExhibitionSearch/>
        </section>
    )
}