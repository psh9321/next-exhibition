import { API_SERVER_FAVORITE_LIST } from '@/entities/favorite/list/api/api.server.favorite.list';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {

        const { offset, limit } = await req.json() as { offset : number, limit : number };

        const result = await API_SERVER_FAVORITE_LIST(offset, limit);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}