import { API_SERVER_REVIEW_ADD } from '@/entities/review/add/api/api.server.review.add';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {

        const param = await req.json() as ADD_REVIEW_PARAMS;

        const result = await API_SERVER_REVIEW_ADD(param)

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}