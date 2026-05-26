declare global {
    interface UPDATE_REVIEW_PARAMS {
        reviewContents : string,
        itemId : string,
        
    }

    interface UPDATE_REVIEW_RESPONSE_ITEM {
        updateDate : Date,
        reviewContents : string,
        msg : string
    }

    type API_REVIEW_UPDATE = RESPONSE_MODEL<UPDATE_REVIEW_RESPONSE_ITEM>
}

export {}