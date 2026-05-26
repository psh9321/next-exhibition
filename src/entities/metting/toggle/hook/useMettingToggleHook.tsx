"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSessionHook } from "@/shared/hook/useSessionHook";

import { API_CLIENT_METTING_TOGGLE } from "../api/api.client.metting.toggle"


export const useMettingToggleHook = (_id : string) => {

    const queryKey = ["metting", "detail", _id];

    const queryClient = useQueryClient();

    const { user } = useSessionHook();

    return useMutation({
        mutationKey : queryKey,
        mutationFn : API_CLIENT_METTING_TOGGLE,
        onSuccess(data) {
            
            queryClient.setQueryData<METTING_DETAIL_INFO_ITEM>(queryKey, (prevData) => {
                if(!prevData) return prevData;

                if(data["data"]?.["isParticipation"]) {
                    const newMember = {
                        name : user?.name as string,
                        id : user?.id as string,
                        isProfileImg : user?.isProfileImg as boolean
                    }

                    return {
                        ...prevData,
                        members : [...prevData.members, newMember]
                    }
                }
                else {
                    return {
                        ...prevData,
                        members : prevData.members.filter((member) => member.id !== user?.id)
                    }
                }
            });

            queryClient.invalidateQueries({queryKey : ["metting", "list", "promise"]})
            queryClient.invalidateQueries({queryKey : ["metting", "page", "mettings"],
                /** invalidateQueries로 매칭된 쿼리들을 active/inactive 상관없이 전부 refetch 하라는 뜻 */
                refetchType : "all"
            })

            return data
        },
    })
}
