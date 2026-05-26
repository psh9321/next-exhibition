import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_METTING_EXHIBITION } from '@/entities/metting/list/exhibitions/api/api.server.metting.exhibition';

export async function POST(req : NextRequest) {
    try {

        const { offset, limit } = await req.json();

        const result = await API_SERVER_METTING_EXHIBITION(offset, limit);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}