"use server"

import { BACKEND_API } from "@/shared/api/server.instance"
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_REVIEW_DELETE(itemId : string) {
    try {
        const api = await BACKEND_API.delete(`review/${itemId}`)

        if(!api.ok) throw api.statusText
        
        SetToken(api);

        return await api.json() as API_REVIEW_DELETE
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}