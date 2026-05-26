import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_GET_EXHIBITION_LIST(params : EXHIBITION_LIST_PARAMS) {
    try {
        const result = await BACKEND_API.get("exhibition/list", {
            searchParams : {
                ...params
            }
        })
        .json<API_GET_EXHIBITION_LIST>()
        .catch<API_GET_EXHIBITION_LIST>();

        if(result["resultCode"] !== 200 || !result["data"]) {
            console.log("API_SERVER_GET_EXHIBITION_LIST fail", result)
            return null;
        }

        return result["data"]
    }
    catch(err) { 
        console.log("API_SERVER_GET_EXHIBITION_LIST error", err);
        throw err;
    }
}