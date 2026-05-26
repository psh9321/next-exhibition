declare global {
    interface DELETE_REVIEW_RESPONSE_ITEM {
        deleteContents : string,
        msg : string
    }

    type API_REVIEW_DELETE = RESPONSE_MODEL<DELETE_REVIEW_RESPONSE_ITEM>
}

export {}