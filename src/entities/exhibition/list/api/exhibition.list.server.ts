import { cache } from "react";

import { OPEN_API } from "@/shared/api/instance"

import { XmlToJson } from "@/shared/lib/xmlToJson";

export async function API_EXHIBITION_LIST_SERVER(searchParams : OPEN_API_QUERY_DATA) {
    try {   

        const xmlStr = await OPEN_API("realm2", {
            method : "get",
            searchParams : {
               serviceKey : process.env["NEXT_EXHIBITION_API_KEY"] as string,   
                ...searchParams
            }
        }).text();

        const jsonData = XmlToJson(xmlStr);
        
        const { OpenAPI_ServiceResponse, response } = jsonData;

        if(OpenAPI_ServiceResponse) return null;

        if(!response) return null;
        if(OpenAPI_ServiceResponse) return null;

        const openApiData = jsonData["response"]["body"] as OPEN_API_SERVER_RESPONSE_DATA;

        const { totalCount, PageNo, numOfrows } = openApiData;
        
        const result = {
            total : Number(totalCount??0),
            page : Number(PageNo??1),
            limit : Number(numOfrows??20),
            data : Array.isArray(openApiData["items"]["item"]) ? openApiData["items"]["item"] : [openApiData["items"]["item"]]
        } as OPEN_API_CLIENT_RESPONSE_DATA;

        
        return result
    }
    catch(err) {
        if(err instanceof Error) {
            throw `${err.message} : api module`
        }
        else {
            throw "API_EXHIBITION_LIST_SERVER 알수없는 에러"
        }
    }
}