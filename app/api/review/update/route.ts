import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_REVIEW_UPDATE } from '@/entities/review/update/api/api.server.review.update';

export async function POST(req : NextRequest) {
    try {

        const param = await req.json();

        const result = await API_SERVER_REVIEW_UPDATE(param);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}