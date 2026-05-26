import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_METTING_EXHIBITION(offset : number, limit = 20) {
    try {
        const result = await CLIENT_API("metting/list/exhibitions", {
            json : { offset, limit }
        }).json<API_METTING_EXHIBITION>();

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}