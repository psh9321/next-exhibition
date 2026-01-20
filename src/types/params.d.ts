declare global {
    interface CLIENT_EXHIBITION_API_PARAMS {
        offset: number;
        limit?: number;
        type?: string;
        sortNum?: number;
        searchKeyword?: string;
        searchStartDate?: string;
        searchEndDate?: string;
        searchArea?: DISTRICT;
        searchCategory: EXHIBITION_CATEGORY;
    }
}

export {};
