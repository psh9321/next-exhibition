declare global {
    interface TOGGLE_RESPONSE_DATA {
        /** 참석 여부 */
        isParticipation: boolean,

        user : {
            name : string,
            id : string,
            isProfileImg : boolean
        }

        msg: "참석" | "참석 하지 않음"
    }

    type API_METTING_TOGGLE = RESPONSE_MODEL<TOGGLE_RESPONSE_DATA>
}

export {}