"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_CLIENT_METTING_POST } from "../api/api.client.metting.post";

export const useMettingPostHook = (status : "add" | "update", exhibitionSeq : string) => {
    
    const queryClient = useQueryClient();

    /** mutationFn 는 무조건 한개의 인자만 파라미터로 받음 */
    return useMutation({
        mutationKey : ["metting", "post", status, exhibitionSeq],
        mutationFn : API_CLIENT_METTING_POST,
        onSuccess(data, variables, onMutateResult, context) {
            queryClient.invalidateQueries({queryKey : ["metting", "post", status, exhibitionSeq]});
            queryClient.invalidateQueries({queryKey : ["metting", "page", "mettings", exhibitionSeq]});
            queryClient.invalidateQueries({queryKey : ["metting", "list", "mettings", exhibitionSeq]});
            queryClient.invalidateQueries({queryKey : ["metting", "list", "promise"]});
            queryClient.invalidateQueries({queryKey : ["metting","exhibitions","list"], refetchType: "all",})
            if(variables.postStatus === "update") queryClient.invalidateQueries({queryKey : ["metting", "detail", variables.mettingId], refetchType: "all"});

            return data
        },
    })
}