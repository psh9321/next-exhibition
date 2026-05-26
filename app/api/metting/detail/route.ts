import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_METTING_DETAIL } from '@/entities/metting/detail/api/api.server.metting.detail';


export async function POST(req : NextRequest) {
    try {

        const _id = await req.json();
        console.log(_id,"fgff")
        const result = await API_SERVER_METTING_DETAIL(_id);

        return NextResponse.json(result,{ status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}