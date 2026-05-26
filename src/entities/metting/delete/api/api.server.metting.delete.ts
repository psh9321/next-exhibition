"use server"

import { BACKEND_API } from "@/shared/api/server.instance";

import { SetToken } from "@/shared/util/token";

export async function API_SERVER_METTING_DELETE(mettingId : string) {
    try {
        const api = await BACKEND_API.delete(`metting/${mettingId}`);

        if(!api.ok) throw api.statusText;

        await SetToken(api);

        return await api.json() as API_METTING_DELETE
    }   
    catch(err) { 
        console.log(err);
        throw err;
    }
}