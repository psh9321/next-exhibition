import { BACKEND_API } from "@/shared/api/server.instance";
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_USER_PROFILE(formData : FormData) {
    try {
        const api = await BACKEND_API.post("users/profile", {
            body : formData
        });

        if(!api.ok) throw api.statusText;

        await SetToken(api);

        return await api.json() as API_USER_PROFILE
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}
