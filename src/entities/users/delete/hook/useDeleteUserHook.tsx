"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { API_CLIENT_DELETE_USER } from "../api/api.client.user.delete"
import { useSessionHook } from "@/shared/hook/useSessionHook"

export const useDeleteUserHook = () => {

    const { user } = useSessionHook();
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : ["delete", "user", user?.id],
        mutationFn : API_CLIENT_DELETE_USER,
        onSuccess(data, variables, onMutateResult, context) {

            if(data.resultCode === 200) {
                queryClient.removeQueries({queryKey : ["favorite"]});
                queryClient.removeQueries({queryKey : ["metting","list","promise"]});
                queryClient.removeQueries({queryKey : ["metting","page","mettings"]});
                queryClient.removeQueries({queryKey : ["metting","list","mettings"]});
            }

            return data
        },
        onError(error, variables, onMutateResult, context) {
            console.log(error, "RRR")
        },
    })
}