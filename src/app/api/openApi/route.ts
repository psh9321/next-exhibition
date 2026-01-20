
import { NextRequest, NextResponse } from 'next/server'

import { API_EXHIBITION_LIST_SERVER } from '@/entities/exhibition/list/api/exhibition.list.server'

import { DataDecrypt, DataEncrypt } from '@/shared/lib/compression';

import { ApiSuccess, ApiError, ApiFail } from '@/shared/model/response';


const isProdiction = process["env"]["NODE_ENV"] === "production";

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

        const data = await API_EXHIBITION_LIST_SERVER(resultParams);

        const responeModel = data ? new ApiSuccess(data) : new ApiFail(resultParams, "전시 목록 불러오기 통신 실패");

        const result = DataEncrypt(JSON.stringify(responeModel))

        return new NextResponse(result, { status : 200 });  
        
    }
    catch(err) {
        const errorResponse = new ApiError(err, "전시 목록 불러오기 통신 에러");

        const result = DataEncrypt(JSON.stringify(errorResponse));
         
        return new NextResponse(result, {status : 500});
    }
}