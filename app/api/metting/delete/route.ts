import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_METTING_DELETE } from '@/entities/metting/delete/api/api.server.metting.delete';

export async function POST(req : NextRequest) {
    try {

        const mettingId = await req.json() as string;

        const result = await API_SERVER_METTING_DELETE(mettingId)

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}