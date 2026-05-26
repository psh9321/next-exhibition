"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_DELETE_USER() {
    try {
        const result = await CLIENT_API("users/delete")
        .json<API_DELETE_USER>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}