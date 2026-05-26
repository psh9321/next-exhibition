"use client"

import { useMettingPromiseListHook } from "@/entities/metting/list/promise/hook/useMettingPromiseListHook"

import { MettingPromiseListBox } from "@/widgets/MettingPromiseListBox";

const MyMettingListPageView = () => {

    const { promiseTotal } = useMettingPromiseListHook();

    return (
        <div className="max-w-[980px] mx-auto">
            <h1 className="sr-only">약속된 모임 페이지</h1>

            <p className="sticky top-[0] py-[20px] text-basic-color text-[1.3rem] font-bold bg-[#11151e] z-2">약속된 모임 <span className="text-[1rem] text-main-color">( {promiseTotal} )</span></p>
            
            <main>
                <MettingPromiseListBox/>
            </main>
        </div>
    )
}

export default MyMettingListPageView