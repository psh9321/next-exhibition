"use client"

import { MettingExhibitionsList } from "@/features/MettingExhibitionsList"
import { MettingList } from "@/features/MettingList"

const MettingExhinitionsListPageView = () => {
    return (
        <div className="max-w-[980px] mx-auto">
            <h1>해당 전시 모임 리스트</h1>
            <main className="flex justify-between">
                <section className="w-[600px]">
                    <h2 className="sr-only">모임이 있는 전시 목록</h2>
                    <MettingExhibitionsList/>
                </section>
                <section className="w-[calc(100%-620px)] min-h-dvh bg-[#222226] rounded-[10px] overflow-y-auto">
                    <h2 className="sr-only">모임 리스트</h2>
                    <MettingList/>
                </section>
            </main>

        </div>
    )
}

export default MettingExhinitionsListPageView