"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_METTING_DELETE(mettingId : string) {
    try {
        const result = await CLIENT_API("metting/delete", {
            json : mettingId
        })
        .json<API_METTING_DELETE>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}