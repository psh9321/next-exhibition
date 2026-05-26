"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { InfiniteData } from "@tanstack/react-query"
import { API_CLIENT_REVIEW_UPDATE } from "../api/api.client.review.update"

export const useUpdateReviewHook = (itemId : string, seq : string) => {

    const queryClient = useQueryClient();

    /** mutationFn 는 무조건 한개의 인자만 파라미터로 받음 */
    return useMutation({
        mutationKey : ["review", "update", itemId],
        mutationFn : API_CLIENT_REVIEW_UPDATE,
        onSuccess(data, variables, onMutateResult, context) {

            if(data["resultCode"] === 200) {

                queryClient.setQueriesData<InfiniteData<REVIEW_LIST>>({ queryKey: ["review", seq] }, oldData => {
                    if (!oldData) return oldData

                    return {
                        ...oldData,
                        pages: oldData.pages.map(page => ({
                            ...page,
                            list: page.list.map(review =>
                                review._id === variables.itemId
                                ? 
                                {
                                    ...review,
                                    contents: data?.["data"]?.["reviewContents"] as string,
                                    updatedAt: data?.["data"]?.["updateDate"]as Date
                                }
                                : 
                                review
                            ),
                        })),
                    }
                })
            }

            return data
        }
    })
}