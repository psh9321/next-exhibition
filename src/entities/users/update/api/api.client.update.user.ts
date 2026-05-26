"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_UPDATE_USER(param : USER_UPDATE_ITEM) {
    try {
        const result = await CLIENT_API("users/update", {
            json : param
        }).json<API_UPDATE_USER>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}