import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_METTING_PROMISE(offset : number, limit = 20) {
    try {
        const result = await CLIENT_API("metting/list/promise", {
            json : { offset, limit }
        })
        .json<API_METTING_PROMISE>();

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}