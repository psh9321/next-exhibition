import z from "zod"
import { mettingFormModel } from "../schema/metting.add.schema"

declare global {
    type METTING_POST_FORM_PARAM = z.infer<typeof mettingFormModel>

    interface METTING_POST_RESPONSE_ITEM {
        /** 등록/수정 된 전시 seq */
        exhibitionSeq : string,

        msg : string
    }

    type API_METTING_POST = RESPONSE_MODEL<METTING_POST_RESPONSE_ITEM>
}

export {}