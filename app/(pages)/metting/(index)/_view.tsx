"use client"

import { MettingExhibitionsList } from "@/features/MettingExhibitionsList"

const MettingExhibitionsPageView = () => {
    return (
        <div className="max-w-[980px] mx-auto">
            <h1>모임이 있는 전시</h1>
            <main className="flex justify-between">
                <section className="w-full">
                    <h2 className="sr-only">모임이 있는 전시 목록</h2>
                    <MettingExhibitionsList/>
                </section>
            </main>

        </div>
    )
}

export default MettingExhibitionsPageView