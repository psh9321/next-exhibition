import { CLIENT_API } from "./_api.call.module";

import { CLIENT_EXHIBITION_API_PARAMS, EXHIBITION_API_RESPONSE } from "@/types/exhibition"
import { ThrowModel } from "@/util/throwModel";
import { RESPONSE_MODEL } from "@/types/response";

export async function API_EXHIBITION_LIST_CLIENT({
    offset = 1,
    limit = 24,
    type = "A",
    ...rest
} : CLIENT_EXHIBITION_API_PARAMS){
    try {
        
        const api = await CLIENT_API("openApi", {
            json : {
                offset,
                limit,
                type,
                ...rest
            }
        });

        const result = await api.json();

        if(!api.ok) throw result;

        return result as EXHIBITION_API_RESPONSE
    }
    catch(err) {
        throw ThrowModel(err as RESPONSE_MODEL<Error>)
    }
}