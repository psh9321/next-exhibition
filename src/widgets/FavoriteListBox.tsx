"use client"

import { FavoriteList } from "@/features/FavoriteList"

export const FavoriteListBox = () => {
    return (
        <section className="w-full">
            <h2 className="sr-only">관심 있는 전시 박스</h2>
            <FavoriteList/>
        </section>  
    )
}