"use client"

import { MettingPromiseList } from "@/features/MettingPromiseList"

export const MettingPromiseListBox = () => {

    return (
        <section>
            <h2 className="sr-only">약속된 모임 리스트</h2>
            <MettingPromiseList/>
        </section>
    )
}