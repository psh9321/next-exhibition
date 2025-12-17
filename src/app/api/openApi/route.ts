
import { NextRequest, NextResponse } from 'next/server'

import { API_EXHIBITION_LIST_SERVER } from '@/api/openApi.server'

import { DataDecrypt, DataEncrypt } from '@/util/crypto';

import { CLIENT_EXHIBITION_API_PARAMS, OPEN_API_QUERY_DATA , DISTRICT, EXHIBITION_API_RESPONSE} from "@/types/exhibition"


export async function POST(req : NextRequest) {
    try {
        const {offset, limit, type, sortNum, searchKeyword, searchArea, searchStartDate, searchEndDate, searchCategory } : CLIENT_EXHIBITION_API_PARAMS = DataDecrypt(await req.json());

        const resultParams = {
            PageNo : String(offset),
            numOfrows : String(limit),
            serviceTp : type as string,
            sortStdr : String(sortNum),
        } as OPEN_API_QUERY_DATA

        if(searchKeyword) resultParams["keyword"] = searchKeyword;
        if(searchStartDate) resultParams["from"] = searchStartDate;
        if(searchEndDate) resultParams["to"] = searchEndDate;
        if(searchArea) resultParams["sido"] = searchArea as DISTRICT;
        if(searchCategory) resultParams["serviceTp"] = searchCategory;

        const { resultCode, data, errMsg } = await API_EXHIBITION_LIST_SERVER(resultParams) as EXHIBITION_API_RESPONSE;

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }),{status : 200});  
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500})
    }
}