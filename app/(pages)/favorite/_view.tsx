"use client"

import { FavoriteTotal } from "@/entities/favorite/list/ui/FavoriteTotal";

import { FavoriteListBox } from "@/widgets/FavoriteListBox";

const FavoritePageView = () => {
    
    return (
        <div className="max-w-[980px] mx-auto">
            <FavoriteTotal/>
            <FavoriteListBox/>
        </div>
    )
}

export default FavoritePageView