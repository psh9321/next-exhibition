"use server"

import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_METTING_DETAIL(_id : string) {
    try {
        const api = await BACKEND_API.get(`metting/detail/${_id}`);

        if(!api.ok) throw api.statusText;

        const result = await api.json<API_METTING_DETAIL>();

        return result;
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}