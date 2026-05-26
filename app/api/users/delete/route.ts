import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_USER_DELETE } from '@/entities/users/delete/api/api.server.user.delete';

export async function POST(req : NextRequest) {
    try {

        const result = await API_SERVER_USER_DELETE();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err, "user/delete router err")
        return NextResponse.json(err, {status : 500});
    }
}