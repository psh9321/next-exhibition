"use client"

import { CLIENT_API } from "@/shared/api/client.instance"

export async function API_CLIENT_REVIEW_UPDATE(param : UPDATE_REVIEW_PARAMS) {
    try {
        const result = await CLIENT_API("review/update", {
            json : param
        })
        .json<API_REVIEW_UPDATE>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}