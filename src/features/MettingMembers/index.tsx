"use client"

import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook";
import { MemberItem } from "./ui/MemberItem";

export const MettingMembers = () => {

    const { members, mettingSeq } = useMettingDetailHook();
    
    return (
        <article className="w-[300px]">
            <h3 className="mb-[30px] text-[#fff] text-left text-[1.4rem] font-bold">참여자 <span className="text-main-color text-[1rem]">({members.length})</span></h3>
            <ul className="flex flex-wrap gap-[10px]">
                {
                    members.map((el, i) => <MemberItem key={`모임참여인원-${mettingSeq}-${el["name"]}-${i}`} item={el} />)
                }
            </ul>
        </article>
    )
}