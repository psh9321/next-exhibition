"use client"

import { useMettingsListHook } from "@/entities/metting/list/mettings/hook/useMettingsListHook"
import { MettingItem } from "@/entities/metting/list/mettings/ui/MettingItem"

export const MettingList = () => {

    const { data, mettingsTotal } = useMettingsListHook();
    
    return (
        <>
            <ol className="p-[20px] space-y-[20px]">
                {
                    mettingsTotal === 0 ?
                    <>ㄹㅁㄴㅇㄹㅁ</>
                    :
                    data?.pages.map(page => {
                        if(!page) return <></>
                        const list = (page as METTINGS_LIST)["list"];
                        return list.map((el, i) => <MettingItem key={`전시에등록된모임-list-${el["exhibitionSeq"]}-${i}`} item={el} />)
                    })
                }
            </ol>
        </>
    )
}