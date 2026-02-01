import { CLIENT_API } from "@/shared/api/instance";

export async function API_EXHIBITION_LIST_CLIENT({
    offset = 1,
    limit = 24,
    type = "A",
    ...rest
} : CLIENT_EXHIBITION_API_PARAMS) : Promise<OPEN_API_CLIENT_RESPONSE_DATA>{
    try {
        
        const result = await CLIENT_API("openApi", {
            json : {
                offset,
                limit,
                type,
                ...rest
            }
        }).json<EXHIBITION_API_RESPONSE>()
        .catch<EXHIBITION_API_RESPONSE>()

        const { resultCode, data } = result;

        if(resultCode !== 200) throw result

        return data as OPEN_API_CLIENT_RESPONSE_DATA
    }
    catch(err) {
        throw err
    }
}