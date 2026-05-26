import { API_SERVER_USER_PROFILE } from '@/entities/users/profile/api/api.server.profile';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {

        const formData = await req.formData();

        await API_SERVER_USER_PROFILE(formData)

        // const dataArr = Array.from(paramsData.getAll("item"));

        // const formData = new FormData();

        // for(let i = 0; i < dataArr.length; i++) formData.append("filesData",dataArr[i]);

        return NextResponse.json({ status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}