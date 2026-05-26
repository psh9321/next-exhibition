"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_CLIENT_METTING_DELETE } from "../api/api.client.metting.delete"
import { useParams } from "next/navigation"

export const useMettingDeleteHook = () => {

    const { _id } = useParams<{_id : string}>()

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : ["metting", "delete", _id],
        mutationFn : () => API_CLIENT_METTING_DELETE(_id),
        onSuccess(data, variables, onMutateResult, context) {
            queryClient.invalidateQueries({queryKey : ["metting", "list", "promise"]})
            queryClient.invalidateQueries({queryKey : ["metting", "page", "mettings"],
                /** invalidateQueries로 매칭된 쿼리들을 active/inactive 상관없이 전부 refetch 하라는 뜻 */
                refetchType : "all"
            });

            queryClient.removeQueries({queryKey : ["metting", "detail", _id]})
        },
    })
}