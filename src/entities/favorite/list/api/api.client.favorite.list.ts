"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_FAVORITE_LIST(offset : number, limit = 20) {
    try {
        const result = await CLIENT_API("favorite/list", {
            json : { offset, limit }
        })
        .json<API_CLIENT_FAVORITE_LIST>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}