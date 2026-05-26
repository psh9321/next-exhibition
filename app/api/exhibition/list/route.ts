import { NextResponse } from "next/server";

import { API_SERVER_GET_EXHIBITION_LIST } from "@/entities/exhibition/list/api/api.server.exhibition.list";

export async function POST(req: Request) {
    try {
        const params = await req.json() as EXHIBITION_LIST_PARAMS;

        const result = await API_SERVER_GET_EXHIBITION_LIST(params);

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log("GET /api/exhibition/list error", err);

        return NextResponse.json(
            { resultCode: -500, data: null },
            { status: 500 },
        );
    }
}
