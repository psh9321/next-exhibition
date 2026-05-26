"use server"

import { BACKEND_API } from "@/shared/api/server.instance";
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_METTING_ADD(param : METTING_POST_FORM_PARAM) {
    try {
        const api = await BACKEND_API.post(`metting/post`, {
            json : param
        });

        if(!api.ok) throw api.statusText;

        await SetToken(api);

        return await api.json() as API_METTING_POST
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}

export async function API_SERVER_METTING_UPDATE(param : METTING_POST_FORM_PARAM) {
    try {
        const api = await BACKEND_API.patch(`metting/post`, {
            json : param
        });

        if(!api.ok) throw api.statusText;

        await SetToken(api);

        return await api.json() as API_METTING_POST
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}

export async function API_SERVER_METTING_POST(param : METTING_POST_FORM_PARAM) {
    try {

        const { postStatus, ...json } = param

        let api;

        switch (postStatus) {
            case "add":
                api = await BACKEND_API.post("metting/post", { json });
            break;

            case "update" : 
                api = await BACKEND_API.patch(`metting/post/${json.mettingId}`,{ json });
            break;
                
            default: api = null; break;
        }

        await SetToken(api as Response);

        return await api?.json() as API_METTING_POST
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}