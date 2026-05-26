declare global {
    interface METTING_EXHIBITION_LIST_ITEM {

        /** 전시 고유 아이디 */
        exhibitionSeq: string;

        /** 전시 썸네일 */
        exhibitionThumbnail: string;

        /** 전시 이름 */
        exhibitionTitle: string;

        /** 전시 시작날짜 */
        exhibitionStartDate: string;

        /** 전시 종료날짜 */
        exhibitionEndDate: string

        /** 전시 장소 */
        exhibitionPlace: string;

        /** 전시 요금 */
        exhibitionPrice: string;

        /** 전시 지역 */
        exhibitionArea: string;

        /** 전시에 등록된 모임 수 */
        mettingsTotal : number;
    }

    type METTING_EXHIBITIONS_LIST = INFINITY_RESPONSE_ITEM<METTING_EXHIBITION_LIST_ITEM[]>

    /** 모임이 있는 전시 api 리스폰스 */
    type API_METTING_EXHIBITION = RESPONSE_MODEL<METTING_EXHIBITIONS_LIST>
    
}

export {}