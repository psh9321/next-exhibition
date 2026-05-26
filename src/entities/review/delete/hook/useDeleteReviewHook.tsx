"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_CLIENT_REVIEW_DELETE } from "../api/api.client.review.delete";

export const useDeleteReviewHook = (seq : string, itemId : string) => {

    const queryClient = useQueryClient();

    /** mutationFn 는 무조건 한개의 인자만 파라미터로 받음 */
    return useMutation({
        mutationKey : ["review", "delete", itemId],
        mutationFn : API_CLIENT_REVIEW_DELETE,
        onSuccess(data, variables, onMutateResult, context) {

            /** review 관련 모든 쿼리 invalidate */
            queryClient.invalidateQueries({queryKey : ["review", seq]})

            return data
        },
    })
}