declare global {
    interface METTING_DELETE_RESPONSE_ITEM {
        deleteContents: {
            mettingTitle: string,
            mettingDate: Date
        },
        msg: string
    }

    type API_METTING_DELETE = RESPONSE_MODEL<METTING_DELETE_RESPONSE_ITEM>;
}

export {}