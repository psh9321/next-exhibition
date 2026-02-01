declare global {

    interface SEARCH_PARAMS {
        seq : string
    }

    type SEARCH_PARAMS_PROMISE = Promise<SEARCH_PARAMS>

    interface DETAIL_PAGE_SERVER {
        params: Promise<SEARCH_PARAMS>;
    }
}

export {};
