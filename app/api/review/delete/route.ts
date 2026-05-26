import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_REVIEW_DELETE } from '@/entities/review/delete/api/api.server.review.delete';

export async function POST(req : NextRequest) {
    try {

        const deleteItemId = await req.json();

        const result = await API_SERVER_REVIEW_DELETE(deleteItemId);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}