import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_REVIEW_ADD(param : ADD_REVIEW_PARAMS) {
    try {
        const result = await BACKEND_API.post("review", {
            json : param
        })
        .json<API_REVIEW_ADD>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}