"use client"

import { CLIENT_API } from "@/shared/api/client.instance"

export async function API_CLIENT_METTING_DETAIL(mettingId : string) {
    try {
        const result = await CLIENT_API("metting/detail", {
            json : mettingId
        }).json<API_METTING_DETAIL>() 

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}