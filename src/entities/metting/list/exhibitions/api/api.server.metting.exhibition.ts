"use server"

import { BACKEND_API } from "@/shared/api/server.instance";
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_METTING_EXHIBITION(offset : number, limit : number) {
    try {
        const api = await BACKEND_API.get("metting/list/exhibitions", {
            searchParams : { offset, limit }
        });

        if(!api.ok) throw api.statusText;

        await SetToken(api);

        return await api.json()
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}