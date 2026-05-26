"use client"

import { Pencil } from "lucide-react"

import { useToastHook } from "@/shared/hook/useToastHook";
import { useSessionHook } from "@/shared/hook/useSessionHook";

import { useExhibitionDetailTabMenuStore } from "@/entities/exhibition/detail/store/useExhibitionDetailTabMenuStore";
import { useReviewAddStore } from "../store/useReviewAddStore";

import { toastOpts } from "@/shared/util/toastOps";

export const BtnAddReview = () => {

    const { isLogin, user } = useSessionHook();

    const { ToastAlert, InitAlert } = useToastHook();

    const SetCurrentTab = useExhibitionDetailTabMenuStore(state => state.SetCurrentTab);

    const SetIsAddReview = useReviewAddStore(state => state.SetIsAddReview);

    function AddReviewCallback() {
        if(!isLogin) return InitAlert(toastOpts["unLogin"]);

        SetCurrentTab("review");
        SetIsAddReview(true);
    }

    return (
        <>
            <button type="button" onClick={AddReviewCallback} className="inline-flex items-center gap-[6px] p-[5px_10px] text-basic-color text-[1.1rem] border border-basic-color rounded-[10px]"><Pencil size={20}/> 후기 쓰기</button>

            <ToastAlert/>
        </>
    )
}