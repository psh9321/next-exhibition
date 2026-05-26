import z from "zod";
import { userUpdateModel } from "../schema/user.update.schema";

declare global {

    type USER_UPDATE_ITEM = z.infer<typeof userUpdateModel>;

    interface UPDATE_RESPONSE_ITEM {

        updateInfo : {
            name: string,
            isProfileImg: false
        }

        msg : string

    }

    type API_UPDATE_USER = RESPONSE_MODEL<UPDATE_RESPONSE_ITEM>
}

export {}
