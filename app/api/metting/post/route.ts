import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_METTING_POST } from '@/entities/metting/post/api/api.server.metting.post';

export async function POST(req : NextRequest) {
    try {

        const param = await req.json() as METTING_POST_FORM_PARAM;

        const result = await API_SERVER_METTING_POST(param);

        return NextResponse.json(result, { status : 200 });    
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}