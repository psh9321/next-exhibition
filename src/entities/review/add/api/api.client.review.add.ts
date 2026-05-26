"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_REVIEW_ADD(param : ADD_REVIEW_PARAMS) {
    try {
        const result = await CLIENT_API("review/add", {
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