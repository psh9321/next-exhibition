"use server"

import { BACKEND_API } from "@/shared/api/server.instance";
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_METTING_PROMISE(offset : number, limit : number) {
    try {
        const api = await BACKEND_API.get("metting/list/promise", {
            searchParams : { offset, limit }
        });

        if(!api.ok) return api.statusText;

        await SetToken(api);

        return await api.json() as API_METTING_PROMISE;
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}