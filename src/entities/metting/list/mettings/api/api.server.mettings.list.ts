"use server"

import { BACKEND_API } from "@/shared/api/server.instance";
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_METTING_METTINGS(seq : string, offset : number, limit : number) {
    try {
        const api = await BACKEND_API.get(`metting/list/mettings/${seq}`, {
            searchParams : { offset, limit }
        })

        if(!api.ok) throw api.statusText;

        SetToken(api);

        return await api.json() as API_METTING_METTINGS
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}