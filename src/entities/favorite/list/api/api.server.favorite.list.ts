import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_FAVORITE_LIST(offset : number, limit=20) {
    try {
        const result = await BACKEND_API.get("favorite/list", {
            searchParams : {
                offset,
                limit
            }
        })
        .json<API_SERVER_FAVORITE_LIST>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}