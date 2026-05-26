"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_USER_PROFILE(formData : FormData) {
    try {
        const result = await CLIENT_API("users/profile", {
            body : formData
        })
        .json<API_USER_PROFILE>();

        return result;
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}
