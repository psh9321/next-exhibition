import { API_SERVER_METTING_PROMISE } from '@/entities/metting/list/promise/api/api.server.metting.promise';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {

        const { offset, limit } = await req.json();

        const result = await API_SERVER_METTING_PROMISE(offset, limit)

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}