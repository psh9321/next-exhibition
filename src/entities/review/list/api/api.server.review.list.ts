import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_REVIEW_LIST(seq : string, my : boolean, offset : number, limit = 20) {
    try {
        const result = await BACKEND_API.get(`review/${seq}`, {
            searchParams : { offset, limit, my }
        })
        .json<API_SERVER_REVIEW_LIST>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}