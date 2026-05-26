import { API_SERVER_METTING_TOGGLE } from '@/entities/metting/toggle/api/api.server.metting.toggle';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {

        const itemId = await req.json();

        const result = await API_SERVER_METTING_TOGGLE(itemId as string)

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}