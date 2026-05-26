"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_CLIENT_REVIEW_ADD } from "../api/api.client.review.add"

export const useAddReviewHook = (seq : string) => {

    const queryClient = useQueryClient();

    /** mutationFn 는 무조건 한개의 인자만 파라미터로 받음 */
    return useMutation({
        mutationKey : ["review", "add", seq],
        mutationFn : API_CLIENT_REVIEW_ADD,
        onSuccess(data, variables, onMutateResult, context) {

            /** review 관련 모든 쿼리 invalidate */
            queryClient.invalidateQueries({queryKey : ["review", seq]})

            return data
        },
    })
}