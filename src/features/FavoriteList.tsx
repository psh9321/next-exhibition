"use client"

import { useFavoriteListHook } from "@/entities/favorite/list/hook/useFavoriteListHook";
import { FavoriteEmpty } from "@/entities/favorite/list/ui/FavoriteEmpty";

import { FavoriteItem } from "@/entities/favorite/list/ui/FavoriteItem";

export const FavoriteList = () => {

    const { data, favoriteTotal } = useFavoriteListHook();

    return (
        <ol className="flex flex-wrap gap-[20px]">
            {
                favoriteTotal === 0 ?
                <FavoriteEmpty/>
                :
                data?.pages.map(page => {
                    if(!page) return <></>
                    const list = (page as FAVORITE_LIST)["list"];
                    return list.map((el, i) => <FavoriteItem item={el} key={`좋아요한전시-${i}-${el?.["exhibitionTitle"]}`}/>)
                })
            }
        </ol>
    )
}