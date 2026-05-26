import { BACKEND_API } from "@/shared/api/server.instance"

export async function API_SERVER_GET_EXHIBITION_DETAIL(seq : string) {
    try {
        const api = await BACKEND_API(`exhibition/detail/${seq}`);

        const result = await api.json() as API_GET_EXHIBITION_DETAIL;

        if(result["resultCode"] !== 200 || !result["data"]) {
            console.log("PrefetchExhibitionList fail", result)
            return null;
        }

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}
