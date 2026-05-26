declare global {
    interface METTING_METTINGS_LIST_ITEM {

        /** 모임 고유 아이디 */
        _id : string,
        
        /** 전시 고유 아이디 */
        exhibitionSeq: string;

        /** 모임장 아이디 */
        createUserId: string;

        /** 모임 타이틀 */
        mettingTitle: string;

        /** 모임 날짜 */
        mettingDate: string;

        /** 모임 총원 */
        totalMember: 5;

        /** 모임 현재 정원 */
        members: {
            /** 유저 이름 */
            name: string,

            /** 유저 아이디 */
            id: string,

            /** 프로필이미지 여부 */
            isProfileImg: boolean
        }[];
    }

    type METTINGS_LIST = INFINITY_RESPONSE_ITEM<METTING_METTINGS_LIST_ITEM[]>;

    type API_METTING_METTINGS = RESPONSE_MODEL<METTINGS_LIST>
}

export {}