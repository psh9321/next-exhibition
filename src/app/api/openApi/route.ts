
import { NextRequest, NextResponse } from 'next/server'

import { API_EXHIBITION_LIST_SERVER } from '@/api/openApi.server'

import { DataDecrypt, DataEncrypt } from '@/util/compression';

import { CLIENT_EXHIBITION_API_PARAMS, OPEN_API_QUERY_DATA , DISTRICT, EXHIBITION_API_RESPONSE} from "@/types/exhibition"
import { ThrowModel } from '@/util/throwModel';


export async function POST(req : NextRequest) {
    try {

        const bodyParserCallback = process["env"]["NODE_ENV"] === "production" ? req.arrayBuffer : req.json

        const {offset, limit, type, searchKeyword, searchArea, searchStartDate, searchEndDate, searchCategory } : CLIENT_EXHIBITION_API_PARAMS = DataDecrypt(await bodyParserCallback());

        const resultParams = {
            PageNo : String(offset),
            numOfrows : String(limit),
            serviceTp : type as string,
            // sortStdr : String(sortNum),
        } as OPEN_API_QUERY_DATA

        if(searchKeyword) resultParams["keyword"] = searchKeyword;
        if(searchStartDate) resultParams["from"] = searchStartDate;
        if(searchEndDate) resultParams["to"] = searchEndDate;
        if(searchArea) resultParams["sido"] = searchArea as DISTRICT;
        if(searchCategory) resultParams["serviceTp"] = searchCategory;

        const { resultCode, data, errMsg } = await API_EXHIBITION_LIST_SERVER(resultParams) as EXHIBITION_API_RESPONSE;

        const result = DataEncrypt(JSON.stringify({ resultCode, data, errMsg }))

        return new NextResponse(result, { status : 200 });  
    }
    catch(err) {


        const errorResponse = JSON.stringify(ThrowModel(err as Error));

        const result = process["env"]["NODE_ENV"] === "production" ? DataEncrypt(errorResponse) : errorResponse;
        
        return new NextResponse(result, {status : 500});
    }
}