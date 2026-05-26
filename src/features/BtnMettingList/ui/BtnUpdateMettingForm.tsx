"use client"

import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook"
import { mettingBtnStyle } from "@/entities/metting/toggle/styles/btn"
import { PostMettingForm } from "@/features/BtnMetting/components/PostMettingForm"
import { CalendarCog } from "lucide-react"
import { useState } from "react"

export const BtnUpdateMettingForm = () => {

    const [ isUpdateForm, SetIsUpdateForm ] = useState(false);

    const { createUser, exhibitionTitle, exhibitionThumbnail, exhibitionSeq, exhibitionPlace, exhibitionPrice, exhibitionStartDate, exhibitionEndDate, mettingDateOrigin, contents, mettingTitle, members, totalMember, mettingSeq } = useMettingDetailHook();

    return (
        <>
            <button onClick={() => SetIsUpdateForm(true)} className={mettingBtnStyle}>
                <CalendarCog/> 모임 정보 수정
            </button>
            {
                isUpdateForm && <PostMettingForm createUserId={createUser?.id} isPostStatus="update" cancelCallback={() => SetIsUpdateForm(false)} exhibitionInfo={{
                    exhibitionTitle : exhibitionTitle,
                    exhibitionStartDate : exhibitionStartDate,
                    exhibitionEndDate : exhibitionEndDate,
                    exhibitionPrice : exhibitionPrice,
                    exhibitionPlace : exhibitionPlace,
                    exhibitionSeq : exhibitionSeq,
                    exhibitionThumbnail : exhibitionThumbnail
                }} 
                defaultFormValue={{
                    mettingDate : new Date(mettingDateOrigin),
                    mettingContents : contents,
                    mettingTitle : mettingTitle,
                    members : members.flatMap(el => el.id),
                    mettingTotalMember : totalMember,
                    createUserId : createUser?.id as string,
                    mettingId : mettingSeq
                }}
                /> 
            }
        </>
    )
}