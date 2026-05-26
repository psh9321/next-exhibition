"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_METTING_POST(param : METTING_POST_FORM_PARAM) {
    try {
        const result = await CLIENT_API(`metting/post`, {
            json : param
        }).json() as API_METTING_POST;

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}