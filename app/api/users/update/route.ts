import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_UPDATE_USER } from '@/entities/users/update/api/api.server.update.user';

export async function POST(req : NextRequest) {
    try {

        const params = await req.json() as USER_UPDATE_ITEM;

        const result = await API_SERVER_UPDATE_USER(params);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}