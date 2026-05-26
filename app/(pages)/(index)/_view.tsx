"use client"

import { ExhibitionListBox } from "@/widgets/ExhibitionListBox"
import { ExhibitionSearchBox } from "@/widgets/ExhibitionSearchBox"

const IndexPageView = () => {
    return (
        <div className="max-w-[980px] mx-auto">
            <h1 className="sr-only">메인 페이지 (전시목록)</h1>
            <ExhibitionSearchBox/>
            <main>
                <ExhibitionListBox/>
            </main>
        </div>
    )
}

export default IndexPageView