declare global {
    interface METTING_PROMISE_ITEM {

        /** 모임 고유 아이디 */
        _id : string;

        /** 모임 총원 */
        totalMember: number;

        /** 현재 모임 정원 */
        members: string[];

        /** 모임 제목 */
        mettingTitle: string;

        /** 모임 날짜 */
        mettingDate: Date;

        /** 유저 아이디 */
        userId: string;

        /** 모임 고유 아이디 */
        mettingId: string;

        /** 전시 제목 */
        exhibitionTitle : string;

        /** 전시 지역 */
        exhibitionArea : string;

        /** 전시 썸네일 */
        exhibitionThumbnail : string;

        /** 전시 장소 */
        exhibitionPlace : string;

        /** 전시 관람 요금 */
        exhibitionPrice : string;
    }

    type METTING_PROMISE_LIST = INFINITY_RESPONSE_ITEM<METTING_PROMISE_ITEM[]>;

    type API_METTING_PROMISE = RESPONSE_MODEL<METTING_PROMISE_LIST>;
}

export {}