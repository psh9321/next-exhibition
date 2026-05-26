"use client"

import { useState } from "react";

import { CalendarPlus } from "lucide-react";

import { useExhibitionDetailHook } from "@/entities/exhibition/detail/hook/useExhibitionDetailHook";

import { useSessionHook } from "@/shared/hook/useSessionHook";
import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from "@/shared/util/toastOps";

import { PostMettingForm } from "./components/PostMettingForm";

export const BtnMettingAddForm = () => {

    const data = useExhibitionDetailHook();

    const { isLogin, user } = useSessionHook();

    const [ isAddForm, SetIsAddForm ] = useState(false);

    const { ToastAlert, InitAlert } = useToastHook();

    function AddMetting() {
        if(!isLogin) return InitAlert(toastOpts["unLogin"]);

        SetIsAddForm(true)
    }
    
    return (
        <>
            <ToastAlert/>
            <button onClick={AddMetting} className="text-[#fff] bg-main-color"><CalendarPlus/> 모임 만들기</button>
            {
                isAddForm && <PostMettingForm createUserId={user?.id} isPostStatus="add" cancelCallback={() => SetIsAddForm(false)} exhibitionInfo={{
                    exhibitionTitle : data.title,
                    exhibitionStartDate : data.startDate,
                    exhibitionEndDate : data.endDate,
                    exhibitionPrice : data.price,
                    exhibitionPlace : data.place,
                    exhibitionSeq : data.seq,
                    exhibitionThumbnail : data.imgUrl,
                }}/> 
            }

        </>
    )
}
