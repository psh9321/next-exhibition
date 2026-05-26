"use client"

import { useMettingExhibitionsHook } from "@/entities/metting/list/exhibitions/hook/useMettingExhibitionsHook"

import { MettingExhibitionsItem } from "@/entities/metting/list/exhibitions/ui/MettingExhibitionsItem"

import { MettingExhibitionEmpty } from "@/entities/metting/list/exhibitions/ui/MettingExhibitionEmpty"

export const MettingExhibitionsList = () => {

    const { data, mettingExhibitionsTotal } = useMettingExhibitionsHook();

    return (
        <ol className="w-full space-y-[20px]">
            {
                mettingExhibitionsTotal === 0 ?
                <MettingExhibitionEmpty/>
                :
                data?.pages.map(page => {
                    if(!page) return <></>
                    const list = (page as METTING_EXHIBITIONS_LIST)["list"];
                    return list.map((el, i) => <MettingExhibitionsItem item={el} key={`모임이있는전시-${i}-${el?.["exhibitionTitle"]}`}/>)
                })
            }
        </ol>
    )
}