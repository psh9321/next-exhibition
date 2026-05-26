"use client"

import { CalendarPlus, CalendarMinus } from 'lucide-react';

import { LogoutCallback } from "@/entities/auth/util/logout";
import { useMettingDetailHook } from "@/entities/metting/detail/hook/useMettingDetailHook";
import { useMettingToggleHook } from "@/entities/metting/toggle/hook/useMettingToggleHook";
import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from '@/shared/util/toastOps';
import { useState } from 'react';
import { mettingBtnStyle } from '@/entities/metting/toggle/styles/btn';
import { twMerge } from 'tailwind-merge';

interface BTN_METTING_TOGGLE {
    className? : string
}

export const BtnMettingToggle = ({ className } : BTN_METTING_TOGGLE) => {

    const { members, totalMember, isLogin, isCreateUser, isParticipation, mettingSeq } = useMettingDetailHook();
    
    const { ToastAlert, InitAlert } = useToastHook();

    const { mutateAsync } = useMettingToggleHook(mettingSeq);

    async function ToggleMettingCallback() {
        try {
            if(!isLogin) return InitAlert(toastOpts["unLogin"]);

            const { resultCode, data } = await mutateAsync(mettingSeq);

            if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
                await LogoutCallback()
            });

        }
        catch(err) {
            console.log("ToggleMettingCallback 알수없는 에러", err);
            InitAlert(toastOpts["unknownError"]);
        }
    }
    return (
        !isCreateUser &&
        <>
            <ToastAlert/>
            <button className={twMerge(`${isParticipation && "text-[#ff5c8a]! border-[#ff5c8a]"}`,className)} onClick={ToggleMettingCallback}>
                {isParticipation ? <CalendarMinus/> : <CalendarPlus/>} 모임 {isParticipation ? "참여 하지 않기" : "참여 하기"}
                <span className="w-full text-[0.8rem]"> {members.length} / {totalMember} {members.length < totalMember ? "모집 중" : "모집 마감"} </span>
            </button>
        </>
        
    )
}