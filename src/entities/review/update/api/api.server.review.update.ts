import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_REVIEW_UPDATE({ itemId, reviewContents } : UPDATE_REVIEW_PARAMS) {
    try {
        const result = await BACKEND_API.patch(`review/${itemId}`, {
            json : { reviewContents }
        })
        .json<API_REVIEW_UPDATE>()

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}