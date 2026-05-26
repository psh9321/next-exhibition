"use client"

import { Trash2 } from "lucide-react"

import { useToastHook } from "@/shared/hook/useToastHook"
import { toastOpts } from "@/shared/util/toastOps"
import { useDeleteReviewHook } from "../../../entities/review/delete/hook/useDeleteReviewHook"
import { LogoutCallback } from "@/entities/auth/util/logout"

interface BTN_REVIEW_DELETE {
    seq : string
    itemId : string
}

export const BtnReviewDelete = ({ seq, itemId } : BTN_REVIEW_DELETE) => {

    const { InitAlert, ToastAlert, InitConfirm, ToastConfirm } = useToastHook();

    const { mutateAsync } = useDeleteReviewHook(seq, itemId);

    function DeleteCallback() {

        InitConfirm(toastOpts["reviewDelete"], async () => {
            try {
                const { resultCode } = await mutateAsync(itemId);

                if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"],LogoutCallback);
            }
            catch(err) {
                console.log("BtnReviewDelete DeleteCallback error", err);
                alert("알수 없는 에러");
            }
        })
    }

    return (
        <>
            <ToastAlert/>
            <ToastConfirm/>

            <button onClick={DeleteCallback}><Trash2/></button>
        </>
    )
}