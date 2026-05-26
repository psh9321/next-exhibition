import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_EXHIBITION_LIST(params : EXHIBITION_LIST_PARAMS) {
    try {
        const result = await CLIENT_API("exhibition/list",  {
            json : params
        })
        .json<INFINITY_RESPONSE_ITEM<EXHIBITION_ITEM[]>>()

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}