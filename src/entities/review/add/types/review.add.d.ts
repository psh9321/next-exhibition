declare global {

    /** 리뷰등록 등록 파라미터 */
    interface ADD_REVIEW_PARAMS {
        exhibitionSeq : string,
        reviewContents : string,
        writerName : string
    }

    interface ADD_REVIEW_RESPONSE_ITEM {
        exhibitionSeq : string,
        msg : string
    }

    type API_REVIEW_ADD = RESPONSE_MODEL<ADD_REVIEW_RESPONSE_ITEM>

}

export {}