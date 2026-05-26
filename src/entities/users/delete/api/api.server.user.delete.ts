"use server"

import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_USER_DELETE() {
    try {
        
        const result = await BACKEND_API.delete(`users`)
        .json<API_DELETE_USER>();

        return result
    }
    catch(err) { 
        console.log(err, "API_SERVER_USER_DELETE error");
        throw err;
    }
}