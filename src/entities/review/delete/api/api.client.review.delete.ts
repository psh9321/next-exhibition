"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_REVIEW_DELETE(itemId : string) {
    try {
        const result = await CLIENT_API("review/delete", {
            json : itemId
        })
        .json<API_REVIEW_DELETE>()

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}