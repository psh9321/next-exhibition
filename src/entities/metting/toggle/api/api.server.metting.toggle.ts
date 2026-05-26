"use server"

import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_METTING_TOGGLE(itemId : string) {
    try {
        const api = await BACKEND_API.post(`metting/toggle/${itemId}`);

        if(!api.ok) throw api.statusText;

        const result = await api.json() as API_METTING_TOGGLE

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}