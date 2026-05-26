"use client"
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { API_CLIENT_METTING_DETAIL } from "../api/api.client.metting.detail";

import { useSessionHook } from "@/shared/hook/useSessionHook";
import { DateParser } from "@/shared/util/dateParser";

export const useMettingDetailHook = () => {

    const { _id } = useParams<{_id : string}>();

    const queryKey = ["metting", "detail" ,_id];

    const { data } = useQuery({
        queryKey,
        queryFn : async () => await API_CLIENT_METTING_DETAIL(_id),
    });

    const { isLogin, user } = useSessionHook();

    function GetMettingStatus() : string {
        if(new Date() < new Date(data?.mettingDate as string)) {
            if(data?.members?.length === data?.totalMember) return "모집 마감"
            else return "모집 중"
        }
        else {
            return "모임 종료"
        }
    }

    function GetCreateUser() {
        console.log(data ,"%%%")
        return data?.members.find(el => el["id"] === data?.createUserId)??null
    }

    function IsParticipation() {
        
        const idArr = [...data?.members??[]].flatMap(el => el["id"]);

        return idArr.includes(user?.["id"] as string)
    }

    return {
        exhibitionSeq : data?.exhibitionSeq,
        exhibitionTitle : data?.exhibitionTitle, 
        exhibitionThumbnail : data?.exhibitionThumbnail, 
        exhibitionStartDate : data?.exhibitionStartDate,
        exhibitionEndDate : data?.exhibitionEndDate,
        exhibitionPlace : data?.exhibitionPlace, 
        mettingTitle : data?.mettingTitle,
        exhibitionPrice : data?.exhibitionPrice,
        contents : data?.contents,
        members : data?.members,
        totalMember : data?.totalMember,
        isLogin, 
        mettingSeq : _id,
        mettingDate : DateParser(data?.mettingDate as string),
        mettingDateOrigin : data?.mettingDate,
        statusMetting : GetMettingStatus(),
        createUser : GetCreateUser(),
        isCreateUser : GetCreateUser()?.["id"] === user?.["id"],
        isParticipation : IsParticipation(),
    }
}