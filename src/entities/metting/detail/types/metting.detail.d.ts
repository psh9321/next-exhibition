declare global {
    interface METTING_DETAIL_INFO_ITEM {
        
        /** 모임 고유 아이디 */
        _id: string,
        
        /** 전시 고유 아이디 */
        exhibitionSeq: string,

        /** 전시 명 */
        exhibitionTitle : string,

        /** 전시 썸네일 */
        exhibitionThumbnail : string,

        /** 전시 시작 날짜 */
        exhibitionStartDate : string,

        /** 전시 종료 날짜 */
        exhibitionEndDate : string,

        /** 전시 장소 */
        exhibitionPlace : string,

        /** 전시 관람 요금 */
        exhibitionPrice : string

        /** 모임장 아이디 */
        createUserId: string,
        
        /** 모임 타이틀 */
        mettingTitle: string,

        /** 모임 날짜 */
        mettingDate: string,

        /** 모임 총원 */
        totalMember: number,
        
        /** 모임 소개 */
        contents : string,

        /** 모임 현재 정원 */
        members: {
            /** 유저 이름 */
            name: string,

            /** 유저 아이디 */
            id: string,

            /** 유저 프로필 이미지 여부 */
            isProfileImg: boolean
        }[],
    }

    type API_METTING_DETAIL = RESPONSE_MODEL<METTING_DETAIL_INFO_ITEM>
}

export {}