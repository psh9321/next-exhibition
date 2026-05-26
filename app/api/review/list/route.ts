import { API_SERVER_REVIEW_LIST } from '@/entities/review/list/api/api.server.review.list';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {

        const { seq, isMy, offset, limit } = await req.json();

        const result = await API_SERVER_REVIEW_LIST(seq, isMy, offset, limit);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}