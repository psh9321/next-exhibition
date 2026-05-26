"use client"

import { LogoutCallback } from "@/entities/auth/util/logout"
import { useMettingDeleteHook } from "@/entities/metting/delete/hook/useMettingDeleteHook"
import { mettingBtnStyle } from "@/entities/metting/toggle/styles/btn"
import { useSessionHook } from "@/shared/hook/useSessionHook"
import { useToastHook } from "@/shared/hook/useToastHook"
import { toastOpts } from "@/shared/util/toastOps"
import { CalendarX2 } from "lucide-react"
import { useRouter } from "next/navigation"

export const BtnMettingDelete = () => {

    const { ToastAlert, InitAlert, InitConfirm, ToastConfirm } = useToastHook();

    const { mutateAsync } = useMettingDeleteHook();

    const { isLogin } = useSessionHook();

    const navigation = useRouter();

    function DeleteCallback() {
        try {

            if(!isLogin) return InitAlert(toastOpts["unLogin"]);

            InitConfirm(toastOpts["mettingDelete"], async () => {
                const { resultCode, data } = await mutateAsync();

                if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
                    await LogoutCallback()
                });    
                
                window.history.length > 1 ? navigation.back() : navigation.push("/metting");
            })
        }
        catch(err) {
            console.log("BtnMettingDelete DeleteCallback 알수없는 에러", err);
            InitAlert(toastOpts["unknownError"]);
        }
    }

    return (
        <>
            <ToastAlert/>
            <ToastConfirm/>

            <button onClick={DeleteCallback} className={`${mettingBtnStyle} text-[#ff5c8a]! border-[#ff5c8a]`}>
                <CalendarX2/> 모임 삭제
            </button>
        </>
    )
}