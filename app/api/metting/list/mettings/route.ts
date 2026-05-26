import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_METTING_METTINGS } from '@/entities/metting/list/mettings/api/api.server.mettings.list';

export async function POST(req : NextRequest) {
    try {

        const { offset, limit, seq } = await req.json();

        const result = await API_SERVER_METTING_METTINGS(seq, offset, limit)

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}