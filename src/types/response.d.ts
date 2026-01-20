declare global {
    interface RESPONSE_MODEL<T> {
        resultCode: number; /** number */
        data: T | null; /** object | string | null */
        errMsg?: string; /** string */
    }

    interface OPEN_API_CLIENT_RESPONSE_DATA {
        total: number;
        page: number;
        limit: number;
        data: EXHIBITION_ITEM[];
    }

    interface OPEN_API_SERVER_RESPONSE_DATA {
        totalCount: string;
        PageNo: string | number;
        numOfrows: string;
        items: {
            item: EXHIBITION_ITEM[];
        };
    }

    interface OPEN_API_QUERY_DATA {
        PageNo: string; /** 페이지 번호 (1부터 시작) */
        numOfrows: string; /** 한 페이지에 보여질 게시물 수 */
        serviceTp: SERVICE_TYPE; /** 분야별구분 */
        sortStdr?: SORT_STDR; /** 정렬기준 */
        sido?: DISTRICT; /** 조회할 지역 */
        from?: string; /** 시작 날짜 ex) 20250419 */
        to?: string; /** 종료 날짜 ex) 20250419 */
        place?: string; /** 조회할 장소 ex) 국립현대미술관 서울관 (띄워쓰기 까지 정확히 입력해야해서 제외 하는게 나을듯) */
        gpsxto?: string; /** 경도 상한 */
        gpsyto?: string; /** 위도 상한 */
        keyword?: string; /** 검색 키워드 */
    }

    type EXHIBITION_API_RESPONSE =
        RESPONSE_MODEL<OPEN_API_CLIENT_RESPONSE_DATA>;

    type EXHIBITION_API_DETAIL_RESPONSE =
        RESPONSE_MODEL<EXHIBITION_DETAIL_ITEM>;

    // type SEARCH_PARAMS = OPEN_API_QUERY_DATA;
}

export {};
