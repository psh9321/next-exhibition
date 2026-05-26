"use server"

import { DataDecrypt, DataEncrypt } from "@/shared/util/crpyto";
import { cookies } from "next/headers";

export async function SetToken(response : Response) {
    const a = response.headers.get("a-t");
    const r = response.headers.get("r-t");

    if(!a || !r) return 

    const token = DataEncrypt({a, r});

    const cookie = await cookies();

    cookie.set(process.env.COOKIE_STORE_NAME as string, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: ((1000 * 60) * 60) * 6,
    })
}

export async function GetToken() : Promise<{a : string, r : string} | null> {
    const cookie = await cookies();

    const token = cookie.get(process.env.COOKIE_STORE_NAME as string);

    if(!token) return null

    return DataDecrypt(token["value"])??null
}

export async function DeleteToken() : Promise<void> {
    const cookie = await cookies();

    cookie.delete(process.env.COOKIE_STORE_NAME as string);
}