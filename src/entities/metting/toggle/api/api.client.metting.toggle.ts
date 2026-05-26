import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_METTING_TOGGLE(itemId : string) {
    try {
        const result = await CLIENT_API(`metting/toggle`,{
            json : itemId
        }).json<API_METTING_TOGGLE>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}