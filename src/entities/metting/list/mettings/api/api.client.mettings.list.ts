import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_METTING_METTINGS(seq : string, offset : number, limit : number) {
    try {
        const result = await CLIENT_API(`metting/list/mettings`, {
            json : { seq, offset, limit }
        }).json() as API_METTING_METTINGS

        return result["data"];
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}