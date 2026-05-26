import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_REVIEW_LIST(seq : string, isMy : boolean, offset : number, limit = 20) {
    try {
        const result = await CLIENT_API(`review/list`, {
            json : { seq, isMy, offset, limit }
        })
        .json<API_CLIENT_REVIEW_LIST>();

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}