import { cache } from "react";

import { OPEN_API } from "@/shared/api/instance"
import { XmlToJson } from "@/shared/lib/xmlToJson";

export const API_EXHIBITION_DETAIL_SERVER = cache(async (seq : string) => {

    try {
        
        const xmlStr = await OPEN_API("detail2", {
            method : "get",
            searchParams : {
                serviceKey : process.env["NEXT_EXHIBITION_API_KEY"],   
                seq
            }   
        }).text();
    
        const jsonData = XmlToJson(xmlStr);
    
        const { OpenAPI_ServiceResponse, response } = jsonData;
    
        if(OpenAPI_ServiceResponse) return null;
        if(!response) return null;

        const result = jsonData["response"]["body"]["items"]["item"] as EXHIBITION_DETAIL_ITEM;
        
        return result
    }
    catch(err) {
        if(err instanceof Error) {
            throw `${err.message} : api module`
        }
        else {
            throw "API_EXHIBITION_DETAIL 알수없는 에러"
        }
    }
})